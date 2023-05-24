import Image from "next/image"
import IData from "@/interfaces/data.interface"
import React from "react"

export default function CurrencyCard(props: {  data: IData, typeOfPurchase: string, taxState: string, handleBack: () => void, convertedValue: string }) {
  const { data, typeOfPurchase, taxState, handleBack, convertedValue } = props
  return (
    <section>
      <div className='auto-layout-currency-card'>
        <button type="button" onClick={handleBack} className="back-button mt-16 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
          <Image
            src="/leftArrow.svg"
            alt=""
            width={20}
            height={16.94}
            priority
          />
          <span className='ml-2 font-size-16 font-semibold sharon-sans'>Voltar</span>
        </button>
        <div className='inside-auto-layout'>
          <p className=' header-currency-card'>O resultado do cálculo é</p>
          <p className='value-converted'>{convertedValue}</p>
        </div>
        <div>
          <p className='radio-block-tipograpy'>
            Compra no {typeOfPurchase === 'money' ? 'dinheiro' : 'cartão'} e taxa de <span className='font-normal'>
              {taxState.replace(',', '.').replace('%', '')}%
            </span>
          </p>
          <p className='radio-block-tipograpy'>
            Cotação do dólar: <span className='font-normal'>
              $1,00 = {Number(data.USDBRL.ask).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
          </p>
        </div>
      </div>
    </section>
  )
};