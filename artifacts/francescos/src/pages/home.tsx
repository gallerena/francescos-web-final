import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  UtensilsCrossed, 
  MapPin, 
  Phone, 
  Clock, 
  Leaf, 
  Flame, 
  Star, 
  Download, 
  Instagram, 
  Facebook, 
  MessageCircle,
  Menu as MenuIcon,
  X,
  ChevronRight
} from "lucide-react";
// Componente removido
// Componente removido
// Componente removido
// Componente removido
// Componente removido

// Data Models
const MENU_ITEMS = {
  antipasti: [
    { name: "Bruschetta Clásica", desc: "Pan artesanal tostado, tomate cherry, albahaca fresca, ajo y aceite de oliva extra virgen.", price: "120", badges: ["vegetariano"] },
    { name: "Carpaccio di Manzo", desc: "Finas láminas de res, arúgula, alcaparras, parmesano reggiano y reducción de balsámico.", price: "240", badges: ["recomendacion"] },
    { name: "Provolone al Forno", desc: "Queso provolone fundido en horno de leña con salsa pomodoro rústica y orégano.", price: "180", badges: [] },
    { name: "Calamari Fritti", desc: "Anillos de calamar crujientes acompañados de alioli de limón y salsa marinara.", price: "210", badges: [] },
    { name: "Burrata con Prosciutto", desc: "Burrata fresca importada, prosciutto di Parma, higos caramelizados y focaccia.", price: "290", badges: ["recomendacion"] },
  ],
  pastas: [
    { name: "Lasagna della Nonna", desc: "Capas de pasta fresca, ragú de res cocinado a fuego lento, bechamel y queso gratinado.", price: "260", badges: ["recomendacion"] },
    { name: "Fettuccine Alfredo", desc: "Pasta fresca envuelta en una cremosa salsa de mantequilla y parmesano reggiano.", price: "220", badges: ["vegetariano"] },
    { name: "Spaghetti alla Carbonara", desc: "Spaghetti con guanciale crujiente, yema de huevo, pecorino romano y pimienta negra.", price: "250", badges: [] },
    { name: "Penne all'Arrabbiata", desc: "Penne rigate en salsa de tomate picante, ajo, guindilla y aceite de oliva.", price: "190", badges: ["vegetariano", "picante"] },
    { name: "Ravioli di Ricotta", desc: "Ravioles rellenos de ricotta y espinaca en salsa de mantequilla y salvia.", price: "240", badges: ["vegetariano"] },
    { name: "Pappardelle al Pesto", desc: "Pappardelle bañado en pesto genovés de albahaca fresca, piñones y parmesano.", price: "230", badges: ["vegetariano"] },
  ],
  pizzas: [
    { name: "Margherita Tradizionale", desc: "Salsa pomodoro San Marzano, mozzarella fresca, hojas de albahaca y aceite de oliva.", price: "210", badges: ["vegetariano", "recomendacion"] },
    { name: "Diavola", desc: "Salsa pomodoro, mozzarella, salami picante, peperoncino y aceitunas negras.", price: "240", badges: ["picante"] },
    { name: "Quattro Formaggi", desc: "Mozzarella, gorgonzola, parmesano y ricotta sobre base blanca con un toque de miel.", price: "260", badges: ["vegetariano"] },
    { name: "Prosciutto e Rucola", desc: "Mozzarella, prosciutto crudo, arúgula fresca, escamas de parmesano y vinagre balsámico.", price: "280", badges: [] },
    { name: "Capricciosa", desc: "Pomodoro, mozzarella, jamón cocido, alcachofas, champiñones y aceitunas.", price: "250", badges: [] },
    { name: "Tartufo e Funghi", desc: "Crema de trufa, mezcla de setas silvestres, mozzarella y tomillo fresco.", price: "290", badges: ["vegetariano", "recomendacion"] },
  ],
  postres: [
    { name: "Tiramisú Clásico", desc: "Capas de savoiardi bañados en espresso, crema de mascarpone y cacao en polvo.", price: "140", badges: ["recomendacion"] },
    { name: "Panna Cotta", desc: "Postre tradicional de crema cocida con coulis de frutos rojos del bosque.", price: "120", badges: [] },
    { name: "Cannoli Siciliani", desc: "Tubos de masa crujiente rellenos de crema de ricotta dulce y chispas de chocolate.", price: "130", badges: [] },
    { name: "Gelato Artigianale", desc: "Helado artesanal del día (Vainilla, Chocolate, Pistache o Limón).", price: "90", badges: ["vegetariano"] },
    { name: "Affogato", desc: "Bola de helado de vainilla ahogada en un shot de espresso caliente.", price: "110", badges: [] },
  ]
};

const TESTIMONIALS = [
  { text: "El ambiente familiar es incomparable. Sentí que estaba cenando en la casa de una familia italiana. La lasagna es un sueño.", author: "Mariana R.", date: "Hace 2 semanas" },
  { text: "Las pizzas a la leña son las mejores de Lomas del Nilo. La masa tiene ese toque ahumado perfecto y los ingredientes son fresquísimos.", author: "Carlos V.", date: "Hace 1 mes" },
  { text: "Celebramos nuestro aniversario aquí y fue mágico. La iluminación, el sabor casero, el vino... todo perfecto. El Tiramisú es obligado.", author: "Sofía & Andrés", date: "Hace 3 meses" },
  { text: "Atención cálida desde que entras. Te explican los platillos con pasión. El Fettuccine artesanal me transportó a Roma.", author: "Fernando G.", date: "Hace 2 semanas" },
  { text: "Un rincón escondido lleno de encanto. El olor a albahaca y leña te atrapa. Excelente relación calidad-precio.", author: "Laura P.", date: "Hace 4 días" }
];

const GALLERY = [
  { src: "/images/dough.png", alt: "Amasando pasta fresca", span: "col-span-1 row-span-1" },
  { src: "/images/oven.png", alt: "Horno de leña tradicional", span: "col-span-1 row-span-2" },
  { src: "/images/ingredients.png", alt: "Ingredientes frescos", span: "col-span-1 row-span-1" },
  { src: "/images/ambience.png", alt: "Ambiente romántico", span: "col-span-2 row-span-1" },
  { src: "/images/decor.png", alt: "Decoración rústica", span: "col-span-1 row-span-1" },
];

export default function Home() {
  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const goToReservaciones = () => {
    setMobileMenuOpen(false);
    setLocation("/reservaciones");
  };

  return (
    <div className="bg-[#FFFDD0] min-h-screen text-[#262626] font-sans selection:bg-[#A0522D] selection:text-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#262626]/95 backdrop-blur-md py-4 shadow-lg text-[#FFFDD0]' : 'bg-transparent py-6 text-white'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="font-serif text-2xl font-bold tracking-wider cursor-pointer" onClick={() => scrollTo('hero')}>
            Francesco's
          </div>
          
          <div className="hidden md:flex space-x-8 items-center text-sm font-medium tracking-wide">
            <button onClick={() => scrollTo('nosotros')} className="hover:text-[#A0522D] transition-colors uppercase">Nosotros</button>
            <button onClick={() => scrollTo('menu')} className="hover:text-[#A0522D] transition-colors uppercase">Menú</button>
            <button onClick={() => scrollTo('galeria')} className="hover:text-[#A0522D] transition-colors uppercase">Galería</button>
            <button onClick={goToReservaciones} className="hover:text-[#A0522D] transition-colors uppercase">Reservaciones</button>
            <button onClick={() => scrollTo('contacto')} className="hover:text-[#A0522D] transition-colors uppercase">Contacto</button>
          </div>

          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#262626] text-[#FFFDD0] flex flex-col items-center justify-center space-y-8 text-xl font-serif">
          <button onClick={() => scrollTo('nosotros')} className="hover:text-[#A0522D] transition-colors">Nosotros</button>
          <button onClick={() => scrollTo('menu')} className="hover:text-[#A0522D] transition-colors">Menú</button>
          <button onClick={() => scrollTo('galeria')} className="hover:text-[#A0522D] transition-colors">Galería</button>
          <button onClick={goToReservaciones} className="hover:text-[#A0522D] transition-colors">Reservaciones</button>
          <button onClick={() => scrollTo('contacto')} className="hover:text-[#A0522D] transition-colors">Contacto</button>
        </div>
      )}

      {/* 1. HERO */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: yHero, opacity: opacityHero }}
        >
          <img 
            src="/images/hero.png" 
            alt="Fondo de pizza a la leña" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          {/* Warm sepia overlay */}
          <div className="absolute inset-0 bg-[#A0522D]/20 mix-blend-multiply"></div>
        </motion.div>

        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto flex flex-col items-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl mb-6 leading-tight"
          >
            La Esencia de Italia<br/>en tu Mesa
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-lg md:text-2xl mb-10 font-light tracking-wide text-[#FFFDD0]/90"
          >
            Sabores auténticos y recetas tradicionales en el corazón de Lomas del Nilo.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button 
              onClick={goToReservaciones}
              className="bg-[#A0522D] hover:bg-[#8A4526] text-white text-lg px-8 py-6 rounded-none font-medium uppercase tracking-widest border-2 border-[#A0522D] transition-all"
            >
              Reserva tu Mesa
            </Button>
            <Button 
              onClick={() => scrollTo('menu')}
              variant="outline" 
              className="bg-transparent border-[#FFFDD0] text-[#FFFDD0] hover:bg-[#FFFDD0] hover:text-[#262626] text-lg px-8 py-6 rounded-none font-medium uppercase tracking-widest transition-all"
            >
              Explora el Menú
            </Button>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/70 flex flex-col items-center cursor-pointer"
          onClick={() => scrollTo('nosotros')}
        >
          <span className="text-xs uppercase tracking-widest mb-2 font-serif">Descubre</span>
          <UtensilsCrossed size={24} />
        </motion.div>
      </section>

      {/* 2. SOBRE NOSOTROS */}
      <section id="nosotros" className="py-24 bg-[#FFFDD0]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-serif text-4xl md:text-5xl text-[#A0522D] mb-6">Nuestra Historia</h2>
              <p className="text-lg leading-relaxed mb-6 text-[#262626]/80">
                Francesco's nació del anhelo de compartir el calor de un hogar italiano. En un rincón de Lomas del Nilo, construimos un refugio donde el aroma a albahaca fresca y leña evoca las cenas familiares de la nonna.
              </p>
              <p className="text-lg leading-relaxed mb-8 text-[#262626]/80">
                Cada platillo es elaborado artesanalmente, respetando los tiempos y los procesos de la verdadera cocina italiana. No es solo comida; es una celebración de la vida, la familia y las buenas costumbres.
              </p>
              <div className="border-l-4 border-[#4B5320] pl-6 py-2 mb-10">
                <p className="font-serif text-xl italic text-[#4B5320]">
                  "Ofrecer un refugio gastronómico donde la calidad y la tradición se encuentran."
                </p>
              </div>
              
              <div className="grid grid-cols-3 gap-6 border-t border-[#262626]/10 pt-8">
                <div>
                  <p className="text-3xl font-serif text-[#A0522D] mb-1">15+</p>
                  <p className="text-xs uppercase tracking-widest text-[#262626]/60">Años de tradición</p>
                </div>
                <div>
                  <p className="text-3xl font-serif text-[#A0522D] mb-1">20</p>
                  <p className="text-xs uppercase tracking-widest text-[#262626]/60">Variedades de pasta</p>
                </div>
                <div>
                  <div className="flex items-center text-3xl font-serif text-[#A0522D] mb-1">
                    4.6 <Star className="w-5 h-5 ml-1 fill-current" />
                  </div>
                  <p className="text-xs uppercase tracking-widest text-[#262626]/60">Reseñas positivas</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-[3/4] overflow-hidden rounded-t-full shadow-2xl relative">
                <img src="https://res.cloudinary.com/du4odtnqj/image/upload/v1777008174/descargar_clz3rq.webp" alt="Fachada de Francesco's" className="w-full h-full object-cover" />
                <div className="absolute inset-0 border-8 border-white/20 rounded-t-full m-4 pointer-events-none"></div>
              </div>
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#FFFDD0] p-3 rounded-full shadow-xl border border-[#262626]/5">
                <div className="w-full h-full overflow-hidden rounded-full relative">
                  <img src="/images/interior.png" alt="Interior acogedor" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <span className="font-serif text-white font-bold tracking-wider text-sm">Nuestra Casa</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. MENÚ INTERACTIVO */}
      <section id="menu" className="py-24 bg-[#262626] text-[#FFFDD0]">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl text-[#FFFDD0] mb-4">El Menú</h2>
            <div className="w-24 h-1 bg-[#A0522D] mx-auto mb-6"></div>
            <p className="text-[#FFFDD0]/70 max-w-2xl mx-auto">
              Recetas heredadas, ingredientes frescos y amor en cada preparación. Descubre nuestra selección.
            </p>
          </div>

          <Tabs defaultValue="pastas" className="w-full">
            <TabsList className="flex flex-wrap justify-center bg-transparent border-b border-[#FFFDD0]/20 rounded-none h-auto mb-12 p-0">
              <TabsTrigger value="antipasti" className="data-[state=active]:bg-transparent data-[state=active]:text-[#A0522D] data-[state=active]:border-b-2 data-[state=active]:border-[#A0522D] rounded-none px-6 py-4 text-lg font-serif uppercase tracking-wider text-[#FFFDD0]/60">Antipasti</TabsTrigger>
              <TabsTrigger value="pastas" className="data-[state=active]:bg-transparent data-[state=active]:text-[#A0522D] data-[state=active]:border-b-2 data-[state=active]:border-[#A0522D] rounded-none px-6 py-4 text-lg font-serif uppercase tracking-wider text-[#FFFDD0]/60">Pastas Clásicas</TabsTrigger>
              <TabsTrigger value="pizzas" className="data-[state=active]:bg-transparent data-[state=active]:text-[#A0522D] data-[state=active]:border-b-2 data-[state=active]:border-[#A0522D] rounded-none px-6 py-4 text-lg font-serif uppercase tracking-wider text-[#FFFDD0]/60">Pizzas Artesanales</TabsTrigger>
              <TabsTrigger value="postres" className="data-[state=active]:bg-transparent data-[state=active]:text-[#A0522D] data-[state=active]:border-b-2 data-[state=active]:border-[#A0522D] rounded-none px-6 py-4 text-lg font-serif uppercase tracking-wider text-[#FFFDD0]/60">Postres y Vinos</TabsTrigger>
            </TabsList>

            {Object.entries(MENU_ITEMS).map(([category, items]) => (
              <TabsContent key={category} value={category} className="space-y-8 animate-in fade-in duration-500">
                <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
                  {items.map((item, idx) => (
                    <div key={idx} className="flex flex-col">
                      <div className="flex justify-between items-baseline mb-2">
                        <h3 className="font-serif text-xl font-bold flex items-center gap-2">
                          {item.name}
                          <div className="flex gap-1">
                            {item.badges.includes("vegetariano") && <span title="Vegetariano"><Leaf className="w-4 h-4 text-[#4B5320]" /></span>}
                            {item.badges.includes("picante") && <span title="Picante"><Flame className="w-4 h-4 text-[#A0522D]" /></span>}
                            {item.badges.includes("recomendacion") && <span title="Recomendación del Chef"><Star className="w-4 h-4 text-yellow-500 fill-current" /></span>}
                          </div>
                        </h3>
                        <div className="flex-1 border-b border-dashed border-[#FFFDD0]/30 mx-4 relative top-[-4px]"></div>
                        <span className="font-serif text-lg">${item.price}</span>
                      </div>
                      <p className="text-[#FFFDD0]/60 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>

          <div className="mt-16 text-center">
            <Button variant="outline" className="border-[#FFFDD0] text-[#262626] bg-[#FFFDD0] hover:bg-[#FFFDD0]/90 rounded-none px-8 py-6 font-medium uppercase tracking-widest gap-2">
              <Download size={18} /> Descargar Menú en PDF
            </Button>
          </div>

          <div className="mt-24">
            <h3 className="font-serif text-3xl text-center mb-10 text-[#A0522D]">Especialidades de la Casa</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="group relative overflow-hidden bg-black aspect-square">
                <img src="/images/lasagna.png" alt="Lasagna della Nonna" className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
                  <h4 className="font-serif text-3xl mb-2 text-white">Lasagna della Nonna</h4>
                  <p className="text-white/80">El orgullo de la casa, horneada lentamente.</p>
                </div>
              </div>
              <div className="group relative overflow-hidden bg-black aspect-square">
                <img src="/images/fettuccine.png" alt="Fettuccine Artesanal" className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
                  <h4 className="font-serif text-3xl mb-2 text-white">Fettuccine Artesanal</h4>
                  <p className="text-white/80">Pasta cortada a mano diariamente.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. GALERÍA */}
      <section id="galeria" className="py-24 bg-[#FFFDD0]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl text-[#A0522D] mb-4">El Arte de Cocinar</h2>
            <div className="w-24 h-1 bg-[#262626] mx-auto mb-6"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[250px] gap-4 max-w-6xl mx-auto">
            {GALLERY.map((img, i) => (
              <Dialog key={i}>
                <DialogTrigger asChild>
                  <div className={`relative group cursor-pointer overflow-hidden bg-[#262626] ${img.span}`}>
                    <img 
                      src={img.src} 
                      alt={img.alt} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white font-serif text-lg text-center px-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        {img.alt}
                      </span>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-4xl bg-transparent border-none shadow-none p-0">
                  <img src={img.src} alt={img.alt} className="w-full h-auto max-h-[80vh] object-contain rounded-md" />
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA RESERVACIONES (link a página dedicada) */}
      <section className="py-20 bg-gradient-to-b from-[#FFFDD0] to-[#EBE9C5]">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-serif text-4xl md:text-5xl text-[#A0522D] mb-6">Reserva tu Mesa</h2>
            <p className="text-lg text-[#262626]/80 mb-10 leading-relaxed">
              Asegura tu lugar en nuestra trattoria. Para celebraciones especiales, déjanos una nota y prepararemos algo memorable para ti.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={goToReservaciones}
                className="bg-[#A0522D] hover:bg-[#4B5320] text-white text-lg px-10 py-6 rounded-none font-medium uppercase tracking-widest transition-colors duration-300"
              >
                Reservar Ahora
              </Button>
              <Button
                variant="outline"
                onClick={() => window.open('https://wa.me/523336066021?text=Hola,%20me%20gustar%C3%ADa%20hacer%20una%20reservaci%C3%B3n.', '_blank')}
                className="bg-[#25D366] hover:bg-[#1EBE5A] text-white border-[#25D366] hover:border-[#1EBE5A] text-lg px-10 py-6 rounded-none font-medium uppercase tracking-widest gap-2"
              >
                <MessageCircle size={18} /> Reserva por Chat
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 6. RESEÑAS Y TESTIMONIALES */}
      <section className="py-24 bg-[#262626] text-[#FFFDD0] overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl text-[#A0522D] mb-4">Lo que dicen en casa</h2>
          <div className="w-16 h-1 bg-[#4B5320] mx-auto mb-16"></div>

          <div className="max-w-4xl mx-auto">
            <Carousel opts={{ align: "center", loop: true }} className="w-full">
              <CarouselContent>
                {TESTIMONIALS.map((t, i) => (
                  <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/2 pl-4">
                    <div className="bg-[#FFFDD0]/5 p-8 rounded-2xl border border-[#FFFDD0]/10 h-full flex flex-col">
                      <div className="flex justify-center gap-1 mb-6 text-yellow-500">
                        <Star className="w-5 h-5 fill-current" />
                        <Star className="w-5 h-5 fill-current" />
                        <Star className="w-5 h-5 fill-current" />
                        <Star className="w-5 h-5 fill-current" />
                        <Star className="w-5 h-5 fill-current" />
                      </div>
                      <p className="font-serif text-lg italic text-[#FFFDD0]/90 mb-6 flex-grow">"{t.text}"</p>
                      <div>
                        <p className="font-bold tracking-wide uppercase text-sm text-[#A0522D]">{t.author}</p>
                        <p className="text-xs text-[#FFFDD0]/40">{t.date}</p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex -left-12 bg-transparent border-[#FFFDD0]/30 hover:bg-[#A0522D] hover:border-[#A0522D] text-[#FFFDD0]" />
              <CarouselNext className="hidden md:flex -right-12 bg-transparent border-[#FFFDD0]/30 hover:bg-[#A0522D] hover:border-[#A0522D] text-[#FFFDD0]" />
            </Carousel>
          </div>
          
          <div className="mt-12">
            <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-[#FFFDD0]/60 hover:text-[#A0522D] transition-colors">
              Ver más reseñas en Google Maps <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 7. UBICACIÓN Y CONTACTO */}
      <section id="contacto" className="py-0 relative h-[600px] flex">
        <div className="w-full lg:w-1/2 h-[400px] lg:h-full order-2 lg:order-1">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14934.331256336333!2d-103.2963162!3d20.6458315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8428b4887019edfb%3A0xcdae921d7b3e414c!2sC.%20El%C3%ADas%20Villalpando%20960%2C%20Lomas%20del%20Nilo%2C%2044820%20Guadalajara%2C%20Jal.!5e0!3m2!1ses-419!2smx!4v1700000000000!5m2!1ses-419!2smx" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación de Francesco's"
            className="filter grayscale-[20%] contrast-125"
          ></iframe>
        </div>
        
        <div className="absolute lg:relative w-full lg:w-1/2 h-full flex items-center bg-black/60 lg:bg-[#FFFDD0] order-1 lg:order-2 p-6">
          <div className="bg-[#FFFDD0] lg:bg-transparent p-8 lg:p-16 rounded-xl lg:rounded-none max-w-lg mx-auto shadow-2xl lg:shadow-none relative z-10 w-full">
            <h2 className="font-serif text-4xl text-[#A0522D] mb-8">Encuéntranos</h2>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="mt-1 bg-[#A0522D]/10 p-3 rounded-full h-fit text-[#A0522D]"><MapPin className="w-6 h-6" /></div>
                <div>
                  <h4 className="font-bold text-[#262626] mb-1">Dirección</h4>
                  <p className="text-[#262626]/70 leading-relaxed">Calle Elías Villalpando #960<br/>Col. Lomas del Nilo<br/>Guadalajara, Jalisco</p>
                  <p className="text-sm text-[#4B5320] mt-2 font-medium italic">A media cuadra de Av. Historiadores. Contamos con valet parking.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="mt-1 bg-[#A0522D]/10 p-3 rounded-full h-fit text-[#A0522D]"><Phone className="w-6 h-6" /></div>
                <div>
                  <h4 className="font-bold text-[#262626] mb-1">Teléfono</h4>
                  <a href="tel:+523336066021" className="text-[#262626]/70 hover:text-[#A0522D] transition-colors">+52 33 3606 6021</a>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="mt-1 bg-[#A0522D]/10 p-3 rounded-full h-fit text-[#A0522D]"><Clock className="w-6 h-6" /></div>
                <div>
                  <h4 className="font-bold text-[#262626] mb-1">Horarios</h4>
                  <p className="text-[#262626]/70">Lunes a Sábado: 13:00 - 23:00</p>
                  <p className="text-[#262626]/70">Domingo: 13:00 - 22:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="bg-[#262626] text-[#FFFDD0]/60 pt-20 pb-8 border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div>
              <div className="font-serif text-3xl font-bold tracking-wider text-[#FFFDD0] mb-4">
                Francesco's
              </div>
              <p className="mb-6 leading-relaxed">
                La verdadera esencia de Italia en Guadalajara. Comida hecha con las manos y el corazón.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#A0522D] hover:text-white transition-all">
                  <Instagram size={20} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#A0522D] hover:text-white transition-all">
                  <Facebook size={20} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-[#FFFDD0] font-serif text-xl mb-6">Enlaces Rápidos</h4>
              <ul className="space-y-3">
                <li><button onClick={() => scrollTo('nosotros')} className="hover:text-[#A0522D] transition-colors">Nuestra Historia</button></li>
                <li><button onClick={() => scrollTo('menu')} className="hover:text-[#A0522D] transition-colors">Menú y Especialidades</button></li>
                <li><button onClick={goToReservaciones} className="hover:text-[#A0522D] transition-colors">Reserva tu Mesa</button></li>
                <li><button onClick={() => scrollTo('contacto')} className="hover:text-[#A0522D] transition-colors">Ubicación</button></li>
                <li><a href="#" className="hover:text-[#A0522D] transition-colors">Aviso de Privacidad</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-[#FFFDD0] font-serif text-xl mb-6">Club de Pasta</h4>
              <p className="mb-4 text-sm">Suscríbete para recibir invitaciones a catas de vino y menú de temporada antes que nadie.</p>
              <div className="flex flex-col gap-2">
                <Input placeholder="Tu correo electrónico" className="bg-white/5 border-white/10 text-white focus-visible:ring-[#A0522D]" />
                <Button className="bg-[#FFFDD0] text-[#262626] hover:bg-[#A0522D] hover:text-white w-full">Suscribirme</Button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-[#FFFDD0]/40">
            <p>&copy; {new Date().getFullYear()} Francesco's Trattoria. Todos los derechos reservados.</p>
            <p className="mt-2 md:mt-0">Hecho con pasión por un Desarrollador Senior</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/523336066021" 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-[0_4px_14px_rgba(37,211,102,0.4)] hover:scale-110 hover:shadow-[0_6px_20px_rgba(37,211,102,0.6)] transition-all duration-300"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle size={28} />
      </a>
    </div>
  );
}
