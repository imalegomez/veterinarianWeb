import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar, Clock, User, Heart, Stethoscope, FileText, Clipboard } from "lucide-react";

export const AppointmentCard = ({ appointment }) => {
  const {
    estado,
    fecha,
    hora,
    motivo,
    notas,
    paciente,
    propietario,
    veterinario
  } = appointment;

  const getStatusStyle = (status) => {
    const styles = {
      'Programada': 'bg-blue-100 text-blue-800 border border-blue-200',
      'Completada': 'bg-green-100 text-green-800 border border-green-200',
      'default': 'bg-gray-100 text-gray-800 border border-gray-200'
    };
    return styles[status] || styles.default;
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Encabezado con estado y fecha */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${getStatusStyle(estado)}`}>
                {estado}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">{format(new Date(fecha), "EEEE d 'de' MMMM, yyyy", { locale: es })}</span>
            </div>
          </div>

          {/* Información de la mascota - Destacada */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <Heart className="h-5 w-5 text-red-500" />
              <div>
                <h3 className="font-semibold text-lg">{paciente.nombre}</h3>
                {paciente.especie && paciente.raza && (
                  <p className="text-sm text-gray-600">
                    {paciente.especie} - {paciente.raza}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Información de contacto */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-blue-500" />
                <div>
                  <span className="text-sm font-medium text-gray-700">Dueño</span>
                  <p className="text-gray-900">{propietario.nombre}</p>
                  {propietario.telefono && (
                    <p className="text-sm text-gray-500">{propietario.telefono}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Stethoscope className="h-4 w-4 text-green-500" />
                <div>
                  <span className="text-sm font-medium text-gray-700">Veterinario</span>
                  <p className="text-gray-900">{veterinario.nombre}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Detalles de la cita */}
          {(motivo || notas) && (
            <div className="space-y-3 pt-2 border-t border-gray-100">
              {motivo && (
                <div className="flex items-start gap-2">
                  <FileText className="h-4 w-4 text-gray-400 mt-1" />
                  <div>
                    <span className="text-sm font-medium text-gray-700">Motivo</span>
                    <p className="text-gray-600 text-sm">{motivo}</p>
                  </div>
                </div>
              )}
              {notas && (
                <div className="flex items-start gap-2">
                  <Clipboard className="h-4 w-4 text-gray-400 mt-1" />
                  <div>
                    <span className="text-sm font-medium text-gray-700">Notas</span>
                    <p className="text-gray-600 text-sm">{notas}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AppointmentCard;