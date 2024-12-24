import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { useStore } from '../store/store'

export function StudentTable({ onAddStudent }: { onAddStudent: () => void }) {
  const { 
    filteredStudents, 
    selectedYear, 
    selectedCourses,
    years,
    availableCourses,
    setFilters 
  } = useStore()

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between">
        <div className="flex gap-[9px]">
          <Select
            value={selectedYear}
            onValueChange={(value) => setFilters(value, selectedCourses)}
          >
            <SelectTrigger className="w-[180px] bg-[#E9EDF1]">
              <SelectValue placeholder="Filter by Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              {years.map(year => (
                <SelectItem key={year} value={year}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={selectedCourses[0] || ''}
            onValueChange={(value) => setFilters(selectedYear, value ? [value] : [])}
          >
            <SelectTrigger className="w-[180px] bg-[#E9EDF1]">
              <SelectValue placeholder="Filter by Courses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Courses</SelectItem>
              {availableCourses.map(course => (
                <SelectItem key={course} value={course}>{course}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          onClick={onAddStudent}
          className="bg-[#E9EDF1] hover:text-white text-[#3F526E]"
        >
          + Add new Student
        </Button>
      </div>
      <table className="w-full mt-4">
         <thead>
           <tr className="border-b">
             <th className="text-left p-4 font-medium text-gray-600">Student Name</th>
             <th className="text-left p-4 font-medium text-gray-600">Cohort</th>
             <th className="text-left p-4 font-medium text-gray-600">Courses</th>
             <th className="text-left p-4 font-medium text-gray-600">Date Joined</th>
             <th className="text-left p-4 font-medium text-gray-600">Last login</th>
             <th className="text-left p-4 font-medium text-gray-600">Status</th>
           </tr>
         </thead>
         <tbody>
         {filteredStudents.map((student) => (
  <tr key={student.id} className="border-b last:border-b-0">
    <td className="p-4">{student.name}</td>
    <td className="p-4">{student.cohort}</td>
    <td className="p-4">{student.courses.join(', ')}</td>
    <td className="p-4">
      {new Date(student.date_joined).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })}
    </td>
    <td className="p-4">
      {new Date(student.last_login).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })}
    </td>
    <td className="p-4">
      <span className={`inline-block px-2 py-1 rounded-full text-xs ${
        student.status === 'active' 
          ? 'bg-green-100 text-green-800' 
          : 'bg-red-100 text-red-800'
      }`}>
        {student.status}
      </span>
    </td>
  </tr>
))}
         </tbody>
      </table>
    </div>
  )
}