"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export function BasicDetails({ data, onChange, onNext }) {
  const [formData, setFormData] = useState({
    package_title: data.package_title || "",
    city: data.city || "",
    locations: data.locations || "",
    min_price: data.min_price || "",
    max_price: data.max_price || "",
    num_nights: data.num_nights || "",
    total_days: data.total_days || "",
    journey_start_place: data.journey_start_place || "",
    journey_end_place: data.journey_end_place || "",
    overview: data.overview || "",
    inclusions_exclusions: data.inclusions_exclusions || "",
    additional_info: data.additional_info || "",
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    // Auto-calculate total days when nights change
    if (formData.num_nights) {
      const nights = Number.parseInt(formData.num_nights)
      if (!isNaN(nights)) {
        setFormData((prev) => ({
          ...prev,
          total_days: (nights + 1).toString(),
        }))
      }
    }
  }, [formData.num_nights])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Required fields
    const requiredFields = [
      "package_title",
      "city",
      "min_price",
      "num_nights",
      "total_days",
      "journey_start_place",
      "journey_end_place",
      "overview",
    ]

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required"
      }
    })

    // Numeric validation
    const numericFields = ["min_price", "max_price", "num_nights", "total_days"]
    numericFields.forEach((field) => {
      if (formData[field] && isNaN(Number.parseFloat(formData[field]))) {
        newErrors[field] = "Must be a number"
      }
    })

    // Price validation
    if (Number.parseFloat(formData.min_price) > Number.parseFloat(formData.max_price)) {
      newErrors.min_price = "Minimum price cannot be greater than maximum price"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      onChange(formData)
      onNext()
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="package_title">
              Package Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="package_title"
              name="package_title"
              value={formData.package_title}
              onChange={handleChange}
              placeholder="Enter package title"
              className={errors.package_title ? "border-red-500" : ""}
            />
            {errors.package_title && <p className="text-red-500 text-sm">{errors.package_title}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">
              City <span className="text-red-500">*</span>
            </Label>
            <Input
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter destination city"
              className={errors.city ? "border-red-500" : ""}
            />
            {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="locations">Locations</Label>
            <Input
              id="locations"
              name="locations"
              value={formData.locations}
              onChange={handleChange}
              placeholder="Enter locations covered (comma separated)"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="min_price">
                Min Price <span className="text-red-500">*</span>
              </Label>
              <Input
                id="min_price"
                name="min_price"
                type="number"
                value={formData.min_price}
                onChange={handleChange}
                placeholder="0.00"
                className={errors.min_price ? "border-red-500" : ""}
              />
              {errors.min_price && <p className="text-red-500 text-sm">{errors.min_price}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="max_price">Max Price</Label>
              <Input
                id="max_price"
                name="max_price"
                type="number"
                value={formData.max_price}
                onChange={handleChange}
                placeholder="0.00"
                className={errors.max_price ? "border-red-500" : ""}
              />
              {errors.max_price && <p className="text-red-500 text-sm">{errors.max_price}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="num_nights">
                Number of Nights <span className="text-red-500">*</span>
              </Label>
              <Input
                id="num_nights"
                name="num_nights"
                type="number"
                value={formData.num_nights}
                onChange={handleChange}
                placeholder="0"
                className={errors.num_nights ? "border-red-500" : ""}
              />
              {errors.num_nights && <p className="text-red-500 text-sm">{errors.num_nights}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="total_days">
                Total Days <span className="text-red-500">*</span>
              </Label>
              <Input
                id="total_days"
                name="total_days"
                type="number"
                value={formData.total_days}
                onChange={handleChange}
                placeholder="0"
                className={errors.total_days ? "border-red-500" : ""}
              />
              {errors.total_days && <p className="text-red-500 text-sm">{errors.total_days}</p>}
              <p className="text-xs text-muted-foreground">Auto-calculated as nights + 1</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="journey_start_place">
              Journey Start Place <span className="text-red-500">*</span>
            </Label>
            <Input
              id="journey_start_place"
              name="journey_start_place"
              value={formData.journey_start_place}
              onChange={handleChange}
              placeholder="Enter journey start place"
              className={errors.journey_start_place ? "border-red-500" : ""}
            />
            {errors.journey_start_place && <p className="text-red-500 text-sm">{errors.journey_start_place}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="journey_end_place">
              Journey End Place <span className="text-red-500">*</span>
            </Label>
            <Input
              id="journey_end_place"
              name="journey_end_place"
              value={formData.journey_end_place}
              onChange={handleChange}
              placeholder="Enter journey end place"
              className={errors.journey_end_place ? "border-red-500" : ""}
            />
            {errors.journey_end_place && <p className="text-red-500 text-sm">{errors.journey_end_place}</p>}
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="overview">
              Overview <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="overview"
              name="overview"
              value={formData.overview}
              onChange={handleChange}
              placeholder="Enter tour overview"
              className={`min-h-[100px] ${errors.overview ? "border-red-500" : ""}`}
            />
            {errors.overview && <p className="text-red-500 text-sm">{errors.overview}</p>}
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="inclusions_exclusions">Inclusions & Exclusions</Label>
            <Textarea
              id="inclusions_exclusions"
              name="inclusions_exclusions"
              value={formData.inclusions_exclusions}
              onChange={handleChange}
              placeholder="Enter what's included and excluded in the package"
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="additional_info">Additional Information</Label>
            <Textarea
              id="additional_info"
              name="additional_info"
              value={formData.additional_info}
              onChange={handleChange}
              placeholder="Enter any additional information"
              className="min-h-[100px]"
            />
          </div>
        </div>

        {Object.keys(errors).length > 0 && (
          <Alert variant="destructive" className="mt-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Please fix the errors above before proceeding.</AlertDescription>
          </Alert>
        )}

        <div className="mt-6 flex justify-end">
          <Button onClick={handleSubmit}>Next: Itinerary</Button>
        </div>
      </CardContent>
    </Card>
  )
}

