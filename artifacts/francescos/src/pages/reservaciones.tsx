import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  Phone,
  Clock,
  MapPin,
  MessageCircle,
  Menu as MenuIcon,
  X,
  ChevronLeft,
  Instagram,
  Facebook,
} from "lucide-react";
// Componente removido
// Componente removido
// Componente removido
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useToast } from "../hooks/use-toast";

export default function Reservaciones() {
  const [, setLocation] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goHomeAndScroll = (id: string) => {
    setMobileMenuOpen(false);
    setLocation(`/#${id}`);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  const handleReservation = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "¡Reservación Confirmada!",
      description:
        "Te esperamos en Francesco's. Hemos enviado un correo con los detalles.",
      duration: 5000,
    });
  };

  return (
    <div className="bg-[#FFFDD0] min-h-screen text-[#262626] font-sans selection:bg-[#A0522D] selection:text-white">
      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#262626]/95 backdrop-blur-md py-4 shadow-lg text-[#FFFDD0]"
            : "bg-[#262626]/80 backdrop-blur-sm py-6 text-white"
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="font-serif text-2xl font-bold tracking-wider cursor-pointer">
            Francesco's
          </Link>

          <div className="hidden md:flex space-x-8 items-center text-sm font-medium tracking-wide">
            <button
              onClick={() => goHomeAndScroll("nosotros")}
              className="hover:text-[#A0522D] transition-colors uppercase"
            >
              Nosotros
            </button>
            <button
              onClick={() => goHomeAndScroll("menu")}
              className="hover:text-[#A0522D] transition-colors uppercase"
            >
              Menú
            </button>
            <button
              onClick={() => goHomeAndScroll("galeria")}
              className="hover:text-[#A0522D] transition-colors uppercase"
            >
              Galería
            </button>
            <Link href="/reservaciones" className="text-[#A0522D] transition-colors uppercase">
              Reservaciones
            </Link>
            <button
              onClick={() => goHomeAndScroll("contacto")}
              className="hover:text-[#A0522D] transition-colors uppercase"
            >
              Contacto
            </button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#262626] text-[#FFFDD0] flex flex-col items-center justify-center space-y-8 text-xl font-serif">
          <button onClick={() => goHomeAndScroll("nosotros")} className="hover:text-[#A0522D]">
            Nosotros
          </button>
          <button onClick={() => goHomeAndScroll("menu")} className="hover:text-[#A0522D]">
            Menú
          </button>
          <button onClick={() => goHomeAndScroll("galeria")} className="hover:text-[#A0522D]">
            Galería
          </button>
          <Link
            href="/reservaciones"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[#A0522D]"
          >
            Reservaciones
          </Link>
          <button onClick={() => goHomeAndScroll("contacto")} className="hover:text-[#A0522D]">
            Contacto
          </button>
        </div>
      )}

      {/* Page Header */}
      <section className="relative pt-32 pb-12 bg-[#262626] text-[#FFFDD0] overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#FFFDD0 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        ></div>
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-[#FFFDD0]/60 hover:text-[#A0522D] transition-colors mb-6">
            <ChevronLeft className="w-4 h-4" /> Volver al inicio
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-4xl md:text-6xl text-[#FFFDD0] mb-4"
          >
            Reserva tu Mesa
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-[#FFFDD0]/70 text-lg max-w-2xl"
          >
            Asegura tu lugar en nuestra trattoria. Para celebraciones especiales,
            déjanos una nota y prepararemos algo memorable.
          </motion.p>
        </div>
      </section>

      {/* Reservation Form */}
      <section className="py-20 bg-gradient-to-b from-[#FFFDD0] to-[#EBE9C5]">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
          >
            <div className="md:w-5/12 bg-[#262626] p-10 text-white flex flex-col justify-center relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(#FFFDD0 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              ></div>
              <h3 className="font-serif text-3xl mb-4 relative z-10">
                Acompáñanos
              </h3>
              <p className="text-[#FFFDD0]/70 mb-8 relative z-10 font-light">
                Reserva con anticipación para asegurar tu lugar. Para eventos
                especiales, déjanos una nota.
              </p>
              <div className="space-y-6 relative z-10">
                <div className="flex items-center gap-4">
                  <Phone className="text-[#A0522D]" />
                  <a href="tel:+523336066021" className="hover:text-[#A0522D] transition-colors">
                    +52 33 3606 6021
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <Clock className="text-[#A0522D]" />
                  <div>
                    <p>Lun-Sáb 13:00 - 23:00</p>
                    <p className="text-sm text-white/60">Dom 13:00 - 22:00</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="text-[#A0522D] mt-1" />
                  <p className="text-sm text-white/80 leading-relaxed">
                    Calle Elías Villalpando #960<br />Lomas del Nilo, Guadalajara
                  </p>
                </div>
              </div>
              <div className="mt-12 relative z-10">
                <Button
                  className="w-full bg-[#25D366] hover:bg-[#1EBE5A] text-white font-bold py-6 rounded-xl flex items-center justify-center gap-2"
                  onClick={() =>
                    window.open(
                      "https://wa.me/523336066021?text=Hola,%20me%20gustar%C3%ADa%20hacer%20una%20reservaci%C3%B3n.",
                      "_blank",
                    )
                  }
                >
                  <MessageCircle /> Reserva por Chat
                </Button>
              </div>
            </div>

            <div className="md:w-7/12 p-10 bg-white">
              <h2 className="font-serif text-3xl text-[#A0522D] mb-8">
                Solicitud de Reservación
              </h2>
              <form onSubmit={handleReservation} className="space-y-5">
                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#262626]">
                      Fecha
                    </label>
                    <Input
                      type="date"
                      required
                      className="border-[#262626]/20 rounded-md focus-visible:ring-[#A0522D]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#262626]">
                      Hora
                    </label>
                    <Input
                      type="time"
                      required
                      className="border-[#262626]/20 rounded-md focus-visible:ring-[#A0522D]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#262626]">
                      Personas
                    </label>
                    <Select required>
                      <SelectTrigger className="border-[#262626]/20">
                        <SelectValue placeholder="Número de personas" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                          <SelectItem key={n} value={n.toString()}>
                            {n} {n === 1 ? "persona" : "personas"}
                          </SelectItem>
                        ))}
                        <SelectItem value="mas">Más de 10</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#262626]">
                      Nombre completo
                    </label>
                    <Input
                      required
                      placeholder="Tu nombre"
                      className="border-[#262626]/20 rounded-md focus-visible:ring-[#A0522D]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#262626]">
                      Teléfono
                    </label>
                    <Input
                      required
                      type="tel"
                      placeholder="Tu teléfono"
                      className="border-[#262626]/20 rounded-md focus-visible:ring-[#A0522D]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#262626]">
                      Email
                    </label>
                    <Input
                      required
                      type="email"
                      placeholder="correo@ejemplo.com"
                      className="border-[#262626]/20 rounded-md focus-visible:ring-[#A0522D]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#262626]">
                    Notas adicionales
                  </label>
                  <Textarea
                    placeholder="Cumpleaños, aniversarios, alergias..."
                    className="border-[#262626]/20 rounded-md focus-visible:ring-[#A0522D] resize-none"
                    rows={3}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#A0522D] hover:bg-[#4B5320] text-white text-lg py-6 rounded-xl transition-colors duration-300 font-medium"
                >
                  Confirmar Reservación
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#262626] text-[#FFFDD0]/60 pt-20 pb-8 border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div>
              <div className="font-serif text-3xl font-bold tracking-wider text-[#FFFDD0] mb-4">
                Francesco's
              </div>
              <p className="mb-6 leading-relaxed">
                La verdadera esencia de Italia en Guadalajara. Comida hecha con
                las manos y el corazón.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#A0522D] hover:text-white transition-all"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#A0522D] hover:text-white transition-all"
                >
                  <Facebook size={20} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-[#FFFDD0] font-serif text-xl mb-6">
                Enlaces Rápidos
              </h4>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => goHomeAndScroll("nosotros")}
                    className="hover:text-[#A0522D] transition-colors"
                  >
                    Nuestra Historia
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => goHomeAndScroll("menu")}
                    className="hover:text-[#A0522D] transition-colors"
                  >
                    Menú y Especialidades
                  </button>
                </li>
                <li>
                  <Link href="/reservaciones" className="hover:text-[#A0522D] transition-colors">
                    Reserva tu Mesa
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => goHomeAndScroll("contacto")}
                    className="hover:text-[#A0522D] transition-colors"
                  >
                    Ubicación
                  </button>
                </li>
                <li>
                  <a href="#" className="hover:text-[#A0522D] transition-colors">
                    Aviso de Privacidad
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-[#FFFDD0] font-serif text-xl mb-6">
                Club de Pasta
              </h4>
              <p className="mb-4 text-sm">
                Suscríbete para recibir invitaciones a catas de vino y menú de
                temporada antes que nadie.
              </p>
              <div className="flex flex-col gap-2">
                <Input
                  placeholder="Tu correo electrónico"
                  className="bg-white/5 border-white/10 text-white focus-visible:ring-[#A0522D]"
                />
                <Button className="bg-[#FFFDD0] text-[#262626] hover:bg-[#A0522D] hover:text-white w-full">
                  Suscribirme
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-[#FFFDD0]/40">
            <p>
              &copy; {new Date().getFullYear()} Francesco's Trattoria. Todos los
              derechos reservados.
            </p>
            <p className="mt-2 md:mt-0">
              Hecho con pasión por un Desarrollador Senior
            </p>
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
