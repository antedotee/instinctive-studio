import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useStore } from "../store/store";

const courseImageMap: { [key: string]: string } = {
  "cbse 9 - maths": "9th_maths.svg",
  "cbse 9 - science": "9th_science.svg",
  "cbse 10 - science": "9th_science.svg",
  "cbse 10 - maths": "9th_maths.svg",
  "cbse 11 - physics": "9th_science.svg",
  "cbse 11 - chemistry": "9th_science.svg",
  "cbse 12 - biology": "9th_science.svg",
  "cbse 12 - maths": "9th_maths.svg",
  // Add other courses and their corresponding images here
};

export function StudentTable({ onAddStudent }: { onAddStudent: () => void }) {
  const {
    filteredStudents,
    selectedYear,
    selectedCourses,
    years,
    availableCourses,
    setFilters,
  } = useStore();

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
              {years.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={selectedCourses[0] || ""}
            onValueChange={(value) =>
              setFilters(selectedYear, value ? [value] : [])
            }
          >
            <SelectTrigger className="w-[180px] bg-[#E9EDF1]">
              <SelectValue placeholder="Filter by Courses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Courses</SelectItem>
              {availableCourses.map((course) => (
                <SelectItem key={course} value={course}>
                  {course}
                </SelectItem>
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
            <th className="text-left p-4 font-medium text-gray-600">
              Student Name
            </th>
            <th className="text-left p-4 font-medium text-gray-600">Cohort</th>
            <th className="text-left p-4 font-medium text-gray-600">Courses</th>
            <th className="text-left p-4 font-medium text-gray-600">
              Date Joined
            </th>
            <th className="text-left p-4 font-medium text-gray-600">
              Last login
            </th>
            <th className="text-left p-4 font-medium text-gray-600">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student.id} className="border-b last:border-b-0">
              <td className="p-4">{student.name}</td>
              <td className="p-4">{student.cohort}</td>
              <td className="p-4">
                <div className="flex flex-wrap gap-2">
                  {student.courses.map((course) => (
                    <div
                      key={course}
                      className="flex items-center bg-gray-200 p-2 rounded-md"
                    >
                      <img
                        src={`/images/${courseImageMap[course.toLowerCase()]}`}
                        alt={course}
                        className="w-5 h-5 mr-2"
                      />
                      <span className="text-sm font-medium">
                        {course.replace(/-/g, " ")}
                      </span>
                    </div>
                  ))}
                </div>
              </td>
              <td className="p-4">
                {new Date(student.date_joined).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </td>
              <td className="p-4">
                {new Date(student.last_login).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </td>
              <td className="p-4 flex items-center justify-center">
                <img
                  src={
                    student.status === "active"
                      ? "/images/green-dot.svg"
                      : "/images/red-dot.svg"
                  }
                  alt={student.status}
                  className="w-4 h-4"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
