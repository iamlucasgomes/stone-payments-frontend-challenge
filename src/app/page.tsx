import Image from 'next/image'
// import { useState, Dispatch, SetStateAction, ChangeEvent } from 'react'

export default function Home() {

  // const [dolar, setDolar] = useState('');
  // const [taxState, setTaxState] = useState('');

  // const handleChange = (setState: Dispatch<SetStateAction<string>>) => (event: ChangeEvent<HTMLInputElement>) => {
  //   setState(event.target.value)
  // };

  return (
    <main className="flex flex-col items-start justify-between p-24">
      <div>
        <Image
          src="/stone.svg"
          alt="Stone Logo"
          width={100}
          height={24}
          priority
        />
      </div>
      <div className='auto-layout-form mt-20'>
        <div className='auto-layout-input'>
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Dólar
          </span>
          <input type="text" name="dolar" value={`$ `} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="$ 1,00" />
        </div>
        <div className='auto-layout-input'>
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Taxa do Estado
          </span>
          <input type="text" name="taxState" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="0 %" />
        </div>
      </div>
      <fieldset className="auto-layout-radio">
        <legend className='mt-5 mb-5 text-sm font-medium text-slate-700'>Tipo de compra</legend>
        <div className="radio-wrapper">
          <label className="radio-button">
            <input type="radio" name="radio-group" id="option1" checked />
            <span className="radio-checkmark"></span>
            <span className="block text-sm font-medium text-slate-700">Dinheiro</span>
          </label>
        </div>

        <div className="radio-wrapper">
          <label className="radio-button">
            <input type="radio" name="radio-group" id="option2" />
            <span className="radio-checkmark"></span>
            <span className="block text-sm font-medium text-slate-700">Cartão</span>
          </label>
        </div>
      </fieldset>

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
      <Image
        className='mask'
        src="/graph.svg"
        alt='Graph'
        width={100}
        height={24}
        priority
      />
    </main>
  )
}
