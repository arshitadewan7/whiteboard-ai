"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

const plumPalette = [0xfff3e6, 0xf7c7ff, 0xdba7f3, 0x9b5f9b, 0x643261]

export function OrbField() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0x381932, 8, 26)

    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 75)
    camera.position.set(-1.2, 0.8, 14)

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)

    const ambient = new THREE.AmbientLight(0xfce4ff, 0.7)
    scene.add(ambient)

    const accent = new THREE.PointLight(0xfff4d6, 1.35, 30)
    accent.position.set(-6, 4, 12)
    scene.add(accent)

    const rim = new THREE.PointLight(0x864A74, 0.65, 45)
    rim.position.set(5, -6, 16)
    scene.add(rim)

    const coreGroup = new THREE.Group()
    scene.add(coreGroup)

    const orbGeometry = new THREE.IcosahedronGeometry(0.42, 1)
    const wireGeometry = new THREE.IcosahedronGeometry(4.5, 2)
    const haloGeometry = new THREE.TorusKnotGeometry(2.6, 0.12, 160, 32)

    const orbs: THREE.Mesh[] = []
    for (let i = 0; i < 44; i++) {
      const material = new THREE.MeshStandardMaterial({
        color: plumPalette[i % plumPalette.length],
        metalness: 0.35,
        roughness: 0.2,
        emissive: new THREE.Color(0x381932).lerp(new THREE.Color(plumPalette[i % plumPalette.length]), 0.18),
        emissiveIntensity: 0.25,
        transparent: true,
        opacity: 0.9,
      })
      const orb = new THREE.Mesh(orbGeometry, material)
      orb.position.set(
        THREE.MathUtils.randFloatSpread(18),
        THREE.MathUtils.randFloatSpread(12),
        THREE.MathUtils.randFloatSpread(20),
      )
      const scale = THREE.MathUtils.randFloat(0.45, 1.2)
      orb.scale.setScalar(scale)
      orb.rotation.set(
        THREE.MathUtils.randFloat(0, Math.PI),
        THREE.MathUtils.randFloat(0, Math.PI),
        THREE.MathUtils.randFloat(0, Math.PI),
      )
      orb.userData = {
        rotationSpeed: THREE.MathUtils.randFloat(0.001, 0.0045) * (Math.random() > 0.5 ? 1 : -1),
        floatOffset: Math.random() * Math.PI * 2,
        floatAmplitude: THREE.MathUtils.randFloat(0.18, 0.55),
      }
      coreGroup.add(orb)
      orbs.push(orb)
    }

    const wireframeMaterial = new THREE.LineBasicMaterial({
      color: 0xf7c7ff,
      transparent: true,
      opacity: 0.35,
    })
    const wireframe = new THREE.LineSegments(new THREE.EdgesGeometry(wireGeometry), wireframeMaterial)
    wireframe.rotation.x = Math.PI * 0.12
    coreGroup.add(wireframe)

    const haloMaterial = new THREE.MeshBasicMaterial({
      color: 0xfce9ff,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
    })
    const halo = new THREE.Mesh(haloGeometry, haloMaterial)
    halo.rotation.set(0.32, 0.12, 0.48)
    coreGroup.add(halo)

    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 240
    const positions = new Float32Array(particlesCount * 3)
    for (let i = 0; i < particlesCount * 3; i += 3) {
      const radius = THREE.MathUtils.randFloat(5.5, 12)
      const theta = THREE.MathUtils.randFloatSpread(Math.PI * 2)
      const phi = THREE.MathUtils.randFloatSpread(Math.PI)
      positions[i] = radius * Math.cos(theta) * Math.cos(phi)
      positions[i + 1] = radius * Math.sin(phi)
      positions[i + 2] = radius * Math.sin(theta) * Math.cos(phi)
    }
    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      sizeAttenuation: true,
      color: 0xfff3e6,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    coreGroup.add(particles)

    const pointer = new THREE.Vector2(0, 0)
    const targetRotation = new THREE.Vector2(0, 0)

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = mount.getBoundingClientRect()
      pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1
      pointer.y = ((event.clientY - bounds.top) / bounds.height) * 2 - 1
    }
    window.addEventListener("pointermove", handlePointerMove)

    const resize = () => {
      const { clientWidth, clientHeight } = mount
      renderer.setSize(clientWidth, clientHeight)
      camera.aspect = clientWidth / (clientHeight || 1)
      camera.updateProjectionMatrix()
    }
    resize()

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(mount)

    let animationFrameId = 0
    const clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      const elapsed = clock.getElapsedTime()
      targetRotation.x = THREE.MathUtils.lerp(targetRotation.x, pointer.y * 0.25, 0.035)
      targetRotation.y = THREE.MathUtils.lerp(targetRotation.y, pointer.x * -0.35, 0.035)

      coreGroup.rotation.x += (targetRotation.x - coreGroup.rotation.x) * 0.04
      coreGroup.rotation.y += (targetRotation.y - coreGroup.rotation.y) * 0.04
      coreGroup.rotation.z = Math.sin(elapsed * 0.1) * 0.12

      wireframe.rotation.y += 0.0018
      halo.rotation.x += 0.0009
      halo.rotation.y -= 0.0012
      particles.rotation.y += 0.0008
      particles.rotation.x -= 0.0006

      orbs.forEach((orb, index) => {
        const { rotationSpeed, floatOffset, floatAmplitude } = orb.userData
        orb.rotation.x += rotationSpeed * 1.6
        orb.rotation.y += rotationSpeed
        orb.position.y += Math.sin(elapsed * 0.9 + floatOffset) * floatAmplitude * 0.008
        orb.position.x += Math.cos(elapsed * 0.6 + floatOffset + index) * floatAmplitude * 0.004
      })

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      resizeObserver.disconnect()
      window.removeEventListener("pointermove", handlePointerMove)
      mount.removeChild(renderer.domElement)
      renderer.dispose()
      particlesGeometry.dispose()
      orbGeometry.dispose()
      wireGeometry.dispose()
      haloGeometry.dispose()
      particlesMaterial.dispose()
      wireframeMaterial.dispose()
      haloMaterial.dispose()
      orbs.forEach((orb) => {
        ;(orb.material as THREE.Material).dispose()
      })
    }
  }, [])

  return <div ref={mountRef} className="absolute inset-0 -z-10 opacity-90" aria-hidden="true" />
}
