import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-start justify-between bg-white p-24">
      <Image
        src="/stone.svg"
        alt="Stone Logo"
        width={100}
        height={24}
        priority
      />
      <p>hello world</p>
      <div className='absolute bottom-0 right-0 responsiveDolar'>
        <Image
          src="/dollar.svg"
          alt="Stone Logo"
          width={790}
          height={768}
          layout='responsive'
          priority
        />
      </div>
    </main>
  )
}
