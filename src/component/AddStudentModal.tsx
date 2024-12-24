import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useStore } from "../store/store"
import { useState } from "react"

interface AddStudentModalProps {
  open: boolean
  onClose: () => void
}

export function AddStudentModal({ open, onClose }: AddStudentModalProps) {
  const { addStudent, availableCourses, years } = useStore()
  const [formData, setFormData] = useState({
    name: "",
    cohort: "",
    courses: [] as string[],
    status: "active" as "active" | "inactive",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    await addStudent({
      name: formData.name,
      cohort: formData.cohort,
      courses: formData.courses,
      status: formData.status,
      date_joined: new Date().toISOString(),
      last_login: new Date().toISOString(),
    })

    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Student</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name Input */}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>
          {/* Academic Year Selector */}
          <div className="space-y-2">
            <Label htmlFor="year">Academic Year</Label>
            <Select
              value={formData.cohort}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, cohort: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Courses Checkbox Grid */}
          <div className="space-y-2">
            <Label>Courses</Label>
            <div className="grid grid-cols-2 gap-2">
              {availableCourses.map((course) => (
                <div key={course} className="flex items-center space-x-2">
                  <Checkbox
                    id={course}
                    checked={formData.courses.includes(course)}
                    onCheckedChange={() => {
                      setFormData((prev) => ({
                        ...prev,
                        courses: prev.courses.includes(course)
                          ? prev.courses.filter((c) => c !== course)
                          : [...prev.courses, course],
                      }))
                    }}
                  />
                  <Label htmlFor={course}>{course}</Label>
                </div>
              ))}
            </div>
          </div>
          {/* Status Selector */}
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value: "active" | "inactive") =>
                setFormData((prev) => ({ ...prev, status: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* Form Actions */}
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!formData.name || !formData.cohort || formData.courses.length === 0}>
              Add Student
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

