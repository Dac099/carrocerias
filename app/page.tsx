export default function Home() {
  return (
    <article className="w-full h-full grid md:grid-cols-2 md:grid-rows-2 gap-2 p-1 grid-cols-1 grid-rows-3">
      <section className="border border-dashed border-indigo-400 rounded-lg content-center">
        <p className='text-center'>Últimas cotizaciones</p>
      </section>
      <section className="border border-dashed border-indigo-400 rounded-lg content-center">
        <p className='text-center'>Trabajos empezados</p>
      </section>
      <section className="border border-dashed border-indigo-400 md:col-span-2 rounded-lg content-center">
        <p className='text-center'>Métricas</p>
      </section>
    </article>
  );
}
