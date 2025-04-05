"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { PlusCircle, Trash2, Image } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export function PhotoUpload({ photos, onChange, onNext, onBack }) {
  const [currentPhotos, setCurrentPhotos] = useState(photos || [])
  const [errors, setErrors] = useState({})

  const addPhoto = () => {
    setCurrentPhotos([...currentPhotos, { photo_url: "" }])
  }

  const updatePhoto = (index, value) => {
    const updatedPhotos = [...currentPhotos]
    updatedPhotos[index].photo_url = value
    setCurrentPhotos(updatedPhotos)

    // Clear error for this photo if it exists
    if (errors[`photo-${index}`]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[`photo-${index}`]
        return newErrors
      })
    }
  }

  const removePhoto = (index) => {
    const updatedPhotos = [...currentPhotos]
    updatedPhotos.splice(index, 1)
    setCurrentPhotos(updatedPhotos)
  }

  const validatePhotos = () => {
    const newErrors = {}

    if (currentPhotos.length === 0) {
      newErrors.general = "Please add at least one photo"
    } else {
      currentPhotos.forEach((photo, index) => {
        if (!photo.photo_url) {
          newErrors[`photo-${index}`] = "Photo URL is required"
        }
      })
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validatePhotos()) {
      onChange(currentPhotos)
      onNext()
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Tour Photos</h3>
            <Button variant="outline" onClick={addPhoto}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Photo
            </Button>
          </div>

          {currentPhotos.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-md">
              <Image className="h-12 w-12 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">No photos added yet. Click "Add Photo" to get started.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentPhotos.map((photo, index) => (
                <div key={`photo-${index}`} className="p-4 border rounded-md">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">Photo {index + 1}</h4>
                    <Button variant="ghost" size="icon" onClick={() => removePhoto(index)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor={`photo-${index}-url`}>
                        Photo URL <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id={`photo-${index}-url`}
                        value={photo.photo_url}
                        onChange={(e) => updatePhoto(index, e.target.value)}
                        placeholder="Enter photo URL"
                        className={errors[`photo-${index}`] ? "border-red-500" : ""}
                      />
                      {errors[`photo-${index}`] && <p className="text-red-500 text-sm">{errors[`photo-${index}`]}</p>}
                    </div>

                    {photo.photo_url && (
                      <div className="mt-2">
                        <div className="relative aspect-video rounded-md overflow-hidden border">
                          <img
                            src={photo.photo_url || "/placeholder.svg"}
                            alt={`Tour photo ${index + 1}`}
                            className="object-cover w-full h-full"
                            onError={(e) => {
                              e.target.src = "/placeholder.svg?height=200&width=300"
                              e.target.alt = "Failed to load image"
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {errors.general && (
          <Alert variant="destructive" className="mt-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{errors.general}</AlertDescription>
          </Alert>
        )}

        <div className="mt-6 flex justify-between">
          <Button variant="outline" onClick={onBack}>
            Back: Itinerary
          </Button>
          <Button onClick={handleSubmit}>Next: Custom Tabs</Button>
        </div>
      </CardContent>
    </Card>
  )
}

