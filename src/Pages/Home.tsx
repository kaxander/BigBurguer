import { FaPhone } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="w-screen h-full font-poppins">
      <header className="flex justify-center">
        <div className="container flex justify-between items-center">
          <a href="">
            <img src="/src/assets//logo.jpg" alt="" width={150}/>
          </a>
          <Link to={'/login'}>
            <button type="button"
              className="w-36 h-12 rounded-3xl text-white text-sm tracking-wider font-semibold border border-current outline-none bg-yellow-500 font-poppins">
                Login
            </button>
          </Link>
          
        </div>
      </header>
      <main className="mt-[105px]">
        <div className='flex justify-center'>
          <div className="container grid grid-cols-12 relative" id="banner">
            <div className="col-span-6">
              <div className="flex flex-col">
                <h1 className="text-6xl font-semibold text-gray-800">Ecolha sua <br /> comida <b className="text-yellow-500">favorita</b></h1>
                <p className="mt-6 font-medium text-gray-500" >Aproveite e veja nosso cardápio! Encontre o seu <br /> lanche favorito para que possamos anotar o seu pedido</p>
              </div>
              <div className="mt-10 flex gap-10">
                <Link to={'/cardapio'} className=" flex bg-yellow-500 text-white text-xl rounded-[20px] p-3 px-5 font-medium shadow-xl">
                  <button type="button" >
                    Ver cárdapio
                  </button>
                </Link>
                
                <button className="flex items-center bg-gray-50 text-gray-500 text-xl rounded-[20px] p-3 px-5 font-medium shadow-xl gap-4 hover:bg-yellow-500 hover:text-white">
                  <span className='bg-yellow-500 p-2 rounded-xl'><FaPhone className='text-white'/></span>
                  (18) 99661-9658</button>
              </div>
            </div>
            <div className="col-span-6">
              <div className='w-[450px] h-[450px] rounded-[170px] bg-yellow-400 absolute right-0 top-[-80px]' id='circulo'></div>
              <div className='flex'>
                <img src="/src/assets/burguer.png" alt="" className='absolute w-[570px] top-[30px] right-[15px]'/>
              </div>
              <div className='rounded-[20px] p-5 shadow-xl border-none absolute bg-white text-gray-500 font-medium text-base right-0 bottom-[-195px]'>
                "Funcionários simpáticos e atenciosos. <br />
                A comida estava deliciosa e gostosa!"
                <br />
                <span className='font-poppins text-yellow-600 font-semibold text-end'>Lucas Silva Solto</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    
  )
}