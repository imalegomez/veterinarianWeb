import { useState, useEffect, useMemo } from 'react'
import { api } from '@/service/api'

export const usePatients = () => {
  const [patients, setPatients] = useState([])
  const [species, setSpecies] = useState([])
  const [owners, setOwners] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // Filtros
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSpecies, setSelectedSpecies] = useState('todos')
  const [selectedStatus, setSelectedStatus] = useState('todos')
  const [sortBy, setSortBy] = useState('nombre')
  const [sortOrder, setSortOrder] = useState('asc')
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const [patientsRes, speciesRes, ownersRes] = await Promise.all([
          api.get('/pacientes'),
          api.get('/especies'),
          api.get('/propietarios')
        ]);

        setPatients(Array.isArray(patientsRes.data) ? patientsRes.data : [])
        setSpecies(Array.isArray(speciesRes.data) ? speciesRes.data : [])
        setOwners(Array.isArray(ownersRes.data) ? ownersRes.data : [])
      } catch (error) {
        console.error('Error fetching data:', error)
        setError('Error al cargar los datos. Por favor, intente nuevamente.')
      } finally {
        setIsLoading(false)
      }
    }
  
    fetchData()
  }, [])
  
  const getSpeciesName = (speciesId) => {
    const specie = species.find((s) => s.id === speciesId)
    return specie ? specie.nombre : 'Desconocido'
  }

  const getOwnerName = (ownerId) => {
    const owner = owners.find((o) => o.id === ownerId)
    return owner ? `${owner.nombre} ${owner.apellido || ''}` : 'Desconocido'
  }

  const getPatientStatus = (lastVisit) => {
    const days = Math.floor((new Date() - new Date(lastVisit)) / (1000 * 60 * 60 * 24))
    if (days > 180) return 'crítico'
    if (days > 90) return 'advertencia'
    return 'activo'
  }

  const filteredPatients = useMemo(() => {
    let result = [...patients]
    
    // Aplicar búsqueda
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      result = result.filter(patient => 
        patient.nombre.toLowerCase().includes(searchLower) ||
        getSpeciesName(patient.especie_id).toLowerCase().includes(searchLower) ||
        getOwnerName(patient.propietario_id).toLowerCase().includes(searchLower)
      )
    }
    
    // Filtrar por especie
    if (selectedSpecies !== 'todos') {
      result = result.filter(patient => patient.especie_id.toString() === selectedSpecies)
    }
    
    // Filtrar por estado
    if (selectedStatus !== 'todos') {
      result = result.filter(patient => getPatientStatus(patient.lastVisit) === selectedStatus)
    }
    
    // Ordenar resultados
    result.sort((a, b) => {
      let compareValue = 0
      switch (sortBy) {
        case 'nombre':
          compareValue = a.nombre.localeCompare(b.nombre)
          break
        case 'especie':
          compareValue = getSpeciesName(a.especie_id).localeCompare(getSpeciesName(b.especie_id))
          break
        case 'ultima_visita':
          compareValue = new Date(b.lastVisit) - new Date(a.lastVisit)
          break
        default:
          compareValue = 0
      }
      return sortOrder === 'asc' ? compareValue : -compareValue
    })
    
    return result
  }, [patients, searchTerm, selectedSpecies, selectedStatus, sortBy, sortOrder])

  const resetFilters = () => {
    setSearchTerm('')
    setSelectedSpecies('todos')
    setSelectedStatus('todos')
    setSortBy('nombre')
    setSortOrder('asc')
  }

  return {
    patients,
    species,
    owners,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    selectedSpecies,
    setSelectedSpecies,
    selectedStatus,
    setSelectedStatus,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    filteredPatients,
    getSpeciesName,
    getOwnerName,
    getPatientStatus,
    resetFilters
  }
}