import { create } from 'zustand'
import { supabase } from '../lib/supabase'

export interface Student {
  id: string
  name: string
  cohort: string
  courses: string[]
  date_joined: string
  last_login: string
  status: 'active' | 'inactive'
}

interface StudentState {
  students: Student[]
  filteredStudents: Student[]
  loading: boolean
  selectedYear: string
  selectedCourses: string[]
  years: string[]
  availableCourses: string[]
  fetchStudents: () => Promise<void>
  addStudent: (student: Omit<Student, 'id'>) => Promise<void>
  setFilters: (year?: string, courses?: string[]) => void
}


export const useStore = create<StudentState>((set, get) => ({
  students: [],
  filteredStudents: [],
  loading: false,
  selectedYear: '',
  selectedCourses: [],
  years: ['AY 2024-25', 'AY 2023-24'],
  availableCourses: [
    'CBSE 9 - Maths',
    'CBSE 9 - Science',
    'CBSE 10 - Maths',
    'CBSE 10 - Science',
    'CBSE 11 - Physics',
    'CBSE 11 - Chemistry',
    'CBSE 12 - Biology',
    'CBSE 12 - Maths',
  ],

  fetchStudents: async () => {
    set({ loading: true })
    const { data, error } = await supabase.from('students').select('*')

    if (error) {
      console.error('Error fetching students:', error)
      set({ loading: false })
      return
    }

    set({
      students: data,
      filteredStudents: data,
      loading: false,
    })
  },

  addStudent: async (student) => {
    const { data, error } = await supabase
      .from('students')
      .insert([student])
      .select()

    if (error) {
      console.error('Error adding student:', error)
      return
    }

    set((state) => ({
      students: [...state.students, data[0]],
      filteredStudents: [...state.filteredStudents, data[0]],
    }))
  },

  setFilters: (year?: string, courses?: string[]) => {
    const { students } = get()
    const updatedFilters = students.filter((s) => {
      if (year === 'all' && (!courses?.length || courses[0] === 'all')) {
        return true
      }
      const yearMatch = year === 'all' || s.cohort === year
      const coursesMatch =
        !courses?.length ||
        courses[0] === 'all' ||
        s.courses.some((course) => courses.includes(course))
      return yearMatch && coursesMatch
    })

    set({
      selectedYear: year || 'all',
      selectedCourses: courses || [],
      filteredStudents: updatedFilters,
    })
  },
}))





