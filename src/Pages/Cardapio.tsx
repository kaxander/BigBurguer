export default function Cardapio() {
  return (
    <div className="font-sans py-4 mx-auto lg:max-w-6xl md:max-w-4xl max-sm:max-w-md">
      <h2 className="text-4xl font-extrabold text-yellow-500 text-center mb-12">Conheça nossos produtos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-6 gap-12">

        <div className="bg-yellow-100 p-2 overflow-hidden cursor-pointer rounded-xl shadow-lg">
          <div className="bg-white flex flex-col h-full">
            <div className="w-full h-[250px] overflow-hidden mx-auto aspect-w-16 aspect-h-8 rounded-xl">
              <img src="https://readymadeui.com/images/food1.webp" alt="food1"
                className="h-full w-full object-cover" />
            </div>

            <div className="p-6 text-center flex-1">
              <h3 className="text-lg font-bold text-gray-800">Veg Burger with Salad</h3>
              <h4 className="text-xl text-gray-800 font-bold mt-3">$22</h4>
            </div>
            
          </div>

        </div>
      </div>
    </div>
  )
}