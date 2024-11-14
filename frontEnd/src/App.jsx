import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom'
import { Bell, Calendar, ChevronDown, FileText, Home, Menu, Search, Users, Stethoscope, X } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import PanelVeterinario from './components/PanelVeterinario'
import Pacientes from './pages/Pacientes'
import Citas from './components/Citas'
import RegistrosMedicos from './components/RegistrosMedicos'

const NavLink = ({ to, children, icon: Icon }) => {
  const location = useLocation()
  const isActive = location.pathname === to
  
  return (
    <Link 
      to={to} 
      className={`flex items-center px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
        isActive 
          ? 'text-blue-600 bg-blue-50 shadow-sm' 
          : 'text-gray-600 hover:bg-gray-50 hover:text-blue-500'
      }`}
    >
      <Icon className={`mr-3 transition-colors ${isActive ? 'text-blue-500' : 'text-gray-400'}`} size={20} />
      {children}
    </Link>
  )
}

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)

  return (
    <Router>
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
        {/* Overlay para móvil */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Barra lateral */}
        <aside className={`
          fixed md:static inset-y-0 left-0 z-30
          bg-white w-72 min-h-screen p-6 border-r
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
        `}>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <Stethoscope className="text-white" size={24} />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                VetCare Pro
              </span>
            </div>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="md:hidden text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
          </div>
          
          <nav className="space-y-2">
            <NavLink to="/home" icon={Home}>Inicio</NavLink>
            <NavLink to="/pacientes" icon={Users}>Pacientes</NavLink>
            <NavLink to="/citas" icon={Calendar}>Citas</NavLink>
            <NavLink to="/registros" icon={FileText}>Registros</NavLink>
          </nav>

          <div className="mt-8 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-md">
                <Calendar className="text-white" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-blue-900">Citas de Hoy</h3>
                <p className="text-sm text-blue-600">8 citas programadas</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Contenido principal */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Encabezado */}
          <header className="bg-white border-b shadow-sm">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
                  className="text-gray-500 hover:text-gray-700 focus:outline-none md:hidden"
                >
                  <Menu size={24} />
                </button>
                <div className="relative">
                  <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${
                    searchFocused ? 'text-blue-500' : 'text-gray-400'
                  }`} size={20} />
                  <Input 
                    type="text" 
                    placeholder="Buscar pacientes..." 
                    className={`w-64 pl-10 transition-all duration-200 ${
                      searchFocused ? 'ring-2 ring-blue-500 border-blue-500' : ''
                    }`}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="relative hover:bg-blue-50 hover:text-blue-500 transition-colors"
                      >
                        <Bell size={20} />
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                          3
                        </span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>3 notificaciones nuevas</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-3 border-l pl-4 hover:bg-gray-50 py-2 px-3 rounded-lg transition-colors">
                      <Avatar className="h-9 w-9 ring-2 ring-offset-2 ring-blue-500">
                        <AvatarImage src="/placeholder-user.jpg" alt="Dr. García" />
                        <AvatarFallback className="bg-blue-500 text-white">DG</AvatarFallback>
                      </Avatar>
                      <div className="hidden md:block text-left">
                        <p className="text-sm font-medium">Dr. García</p>
                        <p className="text-xs text-gray-500">Veterinario Senior</p>
                      </div>
                      <ChevronDown size={16} className="text-gray-400" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Perfil</DropdownMenuItem>
                    <DropdownMenuItem>Configuración</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-500">Cerrar Sesión</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          {/* Contenido de las rutas */}
          <main className="flex-1 overflow-auto bg-gray-50 p-6">
            <Routes>
              <Route path="/home" element={<PanelVeterinario />} />
              <Route path="/pacientes" element={<Pacientes />} />
              <Route path="/citas" element={<Citas />} />
              <Route path="/registros" element={<RegistrosMedicos />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  )
}