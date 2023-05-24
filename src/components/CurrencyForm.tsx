import React from "react";
import Image from "next/image";

export default function CurrencyForm(props: {
  dolar: string,
  setDolar:React.Dispatch<React.SetStateAction<string>>,
  taxState: string,
  setTaxState: React.Dispatch<React.SetStateAction<string>>,
  typeOfPurchase: string,
  setTypeOfPurchase: React.Dispatch<React.SetStateAction<string>>,
  handleConvert: () => void,
  handleChange: (setState: React.Dispatch<React.SetStateAction<string>>) => (event: React.ChangeEvent<HTMLInputElement>) => void
}) {

  const { dolar, handleChange, handleConvert, setDolar, setTaxState, setTypeOfPurchase, taxState, typeOfPurchase, } = props
  return (
    <>
      <section>
        <div className='auto-layout-form mt-20'>
          <div className='auto-layout-input'>
            <span className="block font-size-18 font-medium roboto text-blue-cyan-800">
              Dólar
            </span>
            <input type="text" name="dolar" onChange={handleChange(setDolar)} value={dolar} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded sm:font-size-16 focus:ring-1 dp-shadow-small" placeholder="$ 1,00" required />
          </div>
          <div className='auto-layout-input'>
            <span className="block font-size-18 font-medium roboto text-blue-cyan-800">
              Taxa do Estado
            </span>
            <input type="text" name="taxState" onChange={handleChange(setTaxState)} value={taxState} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded sm:font-size-16 focus:ring-1 dp-shadow-small" placeholder="0 %" />
          </div>
        </div>
      </section>
      <section>
        <fieldset className="auto-layout-radio">
          <legend className='mt-5 mb-5 font-size-18 font-medium roboto text-blue-cyan-800'>Tipo de compra</legend>
          <div className="radio-wrapper">
            <label className="radio-button">
              <input type="radio"
                name="radio-group"
                id="option1"
                value='money'
                checked={typeOfPurchase === 'money'}
                onChange={handleChange(setTypeOfPurchase)} />
              <span className="radio-checkmark"></span>
              <span className="block text-size-rem-1 font-450 circular-std text-blue-cyan-800">Dinheiro</span>
            </label>
          </div>

          <div className="radio-wrapper">
            <label className="radio-button">
              <input type="radio"
                name="radio-group"
                id="option2"
                value='card'
                checked={typeOfPurchase === 'card'}
                onChange={handleChange(setTypeOfPurchase)} />
              <span className="radio-checkmark"></span>
              <span className="block text-size-rem-1 font-450 circular-std text-blue-cyan-800">Cartão</span>
            </label>
          </div>
        </fieldset>
      </section>
      <section>
        <div>
          <button type="button" className="button-converter mt-16 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            onClick={handleConvert} disabled={dolar === ''}>
            <Image
              src="/doubleArrow.svg"
              alt=""
              width={20}
              height={16.94}
              priority
            />
            <span className='ml-2 font-size-16'>Converter</span>
          </button>
        </div>
      </section>
    </>
  )
}