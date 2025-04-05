"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { PlusCircle, Trash2, Camera, MapPin, Coffee } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export function ItineraryManager({ itineraries, totalDays, onChange, onNext, onBack }) {
  const [currentItineraries, setCurrentItineraries] = useState(itineraries || [])
  const [activeDay, setActiveDay] = useState("day-1")
  const [errors, setErrors] = useState({})

  // Initialize itineraries based on total days
  useEffect(() => {
    if (totalDays && (!currentItineraries.length || currentItineraries.length !== Number.parseInt(totalDays))) {
      const days = Number.parseInt(totalDays) || 0
      const newItineraries = []

      for (let i = 1; i <= days; i++) {
        // Find existing itinerary or create new one
        const existingItinerary = currentItineraries.find((it) => it.day_number === i)

        if (existingItinerary) {
          newItineraries.push(existingItinerary)
        } else {
          newItineraries.push({
            day_number: i,
            title: `Day ${i}`,
            description: "",
            activities: [],
            sightseeing: [],
            fooding: [],
          })
        }
      }

      setCurrentItineraries(newItineraries)
    }
  }, [totalDays])

  const handleItineraryChange = (index, field, value) => {
    const updatedItineraries = [...currentItineraries]
    updatedItineraries[index] = {
      ...updatedItineraries[index],
      [field]: value,
    }
    setCurrentItineraries(updatedItineraries)

    // Clear error for this field if it exists
    if (errors[`day-${index + 1}-${field}`]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[`day-${index + 1}-${field}`]
        return newErrors
      })
    }
  }

  // Activities management
  const addActivity = (dayIndex) => {
    const updatedItineraries = [...currentItineraries]
    updatedItineraries[dayIndex].activities.push({
      activity: "",
      description: "",
      photo: "",
    })
    setCurrentItineraries(updatedItineraries)
  }

  const updateActivity = (dayIndex, activityIndex, field, value) => {
    const updatedItineraries = [...currentItineraries]
    updatedItineraries[dayIndex].activities[activityIndex][field] = value
    setCurrentItineraries(updatedItineraries)
  }

  const removeActivity = (dayIndex, activityIndex) => {
    const updatedItineraries = [...currentItineraries]
    updatedItineraries[dayIndex].activities.splice(activityIndex, 1)
    setCurrentItineraries(updatedItineraries)
  }

  // Sightseeing management
  const addSightseeing = (dayIndex) => {
    const updatedItineraries = [...currentItineraries]
    updatedItineraries[dayIndex].sightseeing.push({
      location: "",
      description: "",
      photo: "",
    })
    setCurrentItineraries(updatedItineraries)
  }

  const updateSightseeing = (dayIndex, sightseeingIndex, field, value) => {
    const updatedItineraries = [...currentItineraries]
    updatedItineraries[dayIndex].sightseeing[sightseeingIndex][field] = value
    setCurrentItineraries(updatedItineraries)
  }

  const removeSightseeing = (dayIndex, sightseeingIndex) => {
    const updatedItineraries = [...currentItineraries]
    updatedItineraries[dayIndex].sightseeing.splice(sightseeingIndex, 1)
    setCurrentItineraries(updatedItineraries)
  }

  // Fooding management
  const addFooding = (dayIndex) => {
    const updatedItineraries = [...currentItineraries]
    updatedItineraries[dayIndex].fooding.push({
      food_type: "Breakfast",
      description: "",
      photo: "",
    })
    setCurrentItineraries(updatedItineraries)
  }

  const updateFooding = (dayIndex, foodingIndex, field, value) => {
    const updatedItineraries = [...currentItineraries]
    updatedItineraries[dayIndex].fooding[foodingIndex][field] = value
    setCurrentItineraries(updatedItineraries)
  }

  const removeFooding = (dayIndex, foodingIndex) => {
    const updatedItineraries = [...currentItineraries]
    updatedItineraries[dayIndex].fooding.splice(foodingIndex, 1)
    setCurrentItineraries(updatedItineraries)
  }

  const validateItineraries = () => {
    const newErrors = {}

    currentItineraries.forEach((itinerary, index) => {
      if (!itinerary.title) {
        newErrors[`day-${index + 1}-title`] = "Title is required"
      }

      if (!itinerary.description) {
        newErrors[`day-${index + 1}-description`] = "Description is required"
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateItineraries()) {
      onChange(currentItineraries)
      onNext()
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="mb-6">
          <p className="text-sm text-muted-foreground mb-2">
            Based on your tour duration, you need to add itinerary details for {totalDays} days.
          </p>

          <Tabs value={activeDay} onValueChange={setActiveDay}>
            <TabsList className="mb-4 flex flex-wrap">
              {currentItineraries.map((_, index) => (
                <TabsTrigger key={`day-${index + 1}`} value={`day-${index + 1}`}>
                  Day {index + 1}
                </TabsTrigger>
              ))}
            </TabsList>

            {currentItineraries.map((itinerary, dayIndex) => (
              <TabsContent key={`day-content-${dayIndex + 1}`} value={`day-${dayIndex + 1}`}>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Day {dayIndex + 1} Itinerary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor={`day-${dayIndex + 1}-title`}>
                        Day Title <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id={`day-${dayIndex + 1}-title`}
                        value={itinerary.title}
                        onChange={(e) => handleItineraryChange(dayIndex, "title", e.target.value)}
                        placeholder={`Day ${dayIndex + 1} Title`}
                        className={errors[`day-${dayIndex + 1}-title`] ? "border-red-500" : ""}
                      />
                      {errors[`day-${dayIndex + 1}-title`] && (
                        <p className="text-red-500 text-sm">{errors[`day-${dayIndex + 1}-title`]}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`day-${dayIndex + 1}-description`}>
                        Day Description <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id={`day-${dayIndex + 1}-description`}
                        value={itinerary.description}
                        onChange={(e) => handleItineraryChange(dayIndex, "description", e.target.value)}
                        placeholder="Describe the day's itinerary"
                        className={`min-h-[100px] ${errors[`day-${dayIndex + 1}-description`] ? "border-red-500" : ""}`}
                      />
                      {errors[`day-${dayIndex + 1}-description`] && (
                        <p className="text-red-500 text-sm">{errors[`day-${dayIndex + 1}-description`]}</p>
                      )}
                    </div>

                    <Accordion type="multiple" className="w-full">
                      {/* Activities Section */}
                      <AccordionItem value={`day-${dayIndex + 1}-activities`}>
                        <AccordionTrigger className="text-base font-medium">
                          <div className="flex items-center gap-2">
                            <Camera className="h-4 w-4" />
                            Activities
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          {itinerary.activities.map((activity, activityIndex) => (
                            <div key={`activity-${activityIndex}`} className="mb-4 p-4 border rounded-md">
                              <div className="flex justify-between items-center mb-2">
                                <h4 className="font-medium">Activity {activityIndex + 1}</h4>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => removeActivity(dayIndex, activityIndex)}
                                >
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                              </div>

                              <div className="space-y-4">
                                <div>
                                  <Label htmlFor={`activity-${dayIndex}-${activityIndex}-name`}>Activity Name</Label>
                                  <Input
                                    id={`activity-${dayIndex}-${activityIndex}-name`}
                                    value={activity.activity}
                                    onChange={(e) =>
                                      updateActivity(dayIndex, activityIndex, "activity", e.target.value)
                                    }
                                    placeholder="Enter activity name"
                                  />
                                </div>

                                <div>
                                  <Label htmlFor={`activity-${dayIndex}-${activityIndex}-description`}>
                                    Description
                                  </Label>
                                  <Textarea
                                    id={`activity-${dayIndex}-${activityIndex}-description`}
                                    value={activity.description}
                                    onChange={(e) =>
                                      updateActivity(dayIndex, activityIndex, "description", e.target.value)
                                    }
                                    placeholder="Describe the activity"
                                  />
                                </div>

                                <div>
                                  <Label htmlFor={`activity-${dayIndex}-${activityIndex}-photo`}>Photo URL</Label>
                                  <Input
                                    id={`activity-${dayIndex}-${activityIndex}-photo`}
                                    value={activity.photo}
                                    onChange={(e) => updateActivity(dayIndex, activityIndex, "photo", e.target.value)}
                                    placeholder="Enter photo URL"
                                  />
                                </div>
                              </div>
                            </div>
                          ))}

                          <Button variant="outline" onClick={() => addActivity(dayIndex)} className="w-full mt-2">
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Add Activity
                          </Button>
                        </AccordionContent>
                      </AccordionItem>

                      {/* Sightseeing Section */}
                      <AccordionItem value={`day-${dayIndex + 1}-sightseeing`}>
                        <AccordionTrigger className="text-base font-medium">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            Sightseeing
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          {itinerary.sightseeing.map((sight, sightIndex) => (
                            <div key={`sight-${sightIndex}`} className="mb-4 p-4 border rounded-md">
                              <div className="flex justify-between items-center mb-2">
                                <h4 className="font-medium">Sightseeing {sightIndex + 1}</h4>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => removeSightseeing(dayIndex, sightIndex)}
                                >
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                              </div>

                              <div className="space-y-4">
                                <div>
                                  <Label htmlFor={`sight-${dayIndex}-${sightIndex}-location`}>Location</Label>
                                  <Input
                                    id={`sight-${dayIndex}-${sightIndex}-location`}
                                    value={sight.location}
                                    onChange={(e) =>
                                      updateSightseeing(dayIndex, sightIndex, "location", e.target.value)
                                    }
                                    placeholder="Enter location name"
                                  />
                                </div>

                                <div>
                                  <Label htmlFor={`sight-${dayIndex}-${sightIndex}-description`}>Description</Label>
                                  <Textarea
                                    id={`sight-${dayIndex}-${sightIndex}-description`}
                                    value={sight.description}
                                    onChange={(e) =>
                                      updateSightseeing(dayIndex, sightIndex, "description", e.target.value)
                                    }
                                    placeholder="Describe the sightseeing location"
                                  />
                                </div>

                                <div>
                                  <Label htmlFor={`sight-${dayIndex}-${sightIndex}-photo`}>Photo URL</Label>
                                  <Input
                                    id={`sight-${dayIndex}-${sightIndex}-photo`}
                                    value={sight.photo}
                                    onChange={(e) => updateSightseeing(dayIndex, sightIndex, "photo", e.target.value)}
                                    placeholder="Enter photo URL"
                                  />
                                </div>
                              </div>
                            </div>
                          ))}

                          <Button variant="outline" onClick={() => addSightseeing(dayIndex)} className="w-full mt-2">
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Add Sightseeing
                          </Button>
                        </AccordionContent>
                      </AccordionItem>

                      {/* Fooding Section */}
                      <AccordionItem value={`day-${dayIndex + 1}-fooding`}>
                        <AccordionTrigger className="text-base font-medium">
                          <div className="flex items-center gap-2">
                            <Coffee className="h-4 w-4" />
                            Meals
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          {itinerary.fooding.map((food, foodIndex) => (
                            <div key={`food-${foodIndex}`} className="mb-4 p-4 border rounded-md">
                              <div className="flex justify-between items-center mb-2">
                                <h4 className="font-medium">Meal {foodIndex + 1}</h4>
                                <Button variant="ghost" size="icon" onClick={() => removeFooding(dayIndex, foodIndex)}>
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                              </div>

                              <div className="space-y-4">
                                <div>
                                  <Label htmlFor={`food-${dayIndex}-${foodIndex}-type`}>Meal Type</Label>
                                  <select
                                    id={`food-${dayIndex}-${foodIndex}-type`}
                                    value={food.food_type}
                                    onChange={(e) => updateFooding(dayIndex, foodIndex, "food_type", e.target.value)}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                  >
                                    <option value="Breakfast">Breakfast</option>
                                    <option value="Lunch">Lunch</option>
                                    <option value="Dinner">Dinner</option>
                                    <option value="Snacks">Snacks</option>
                                  </select>
                                </div>

                                <div>
                                  <Label htmlFor={`food-${dayIndex}-${foodIndex}-description`}>Description</Label>
                                  <Textarea
                                    id={`food-${dayIndex}-${foodIndex}-description`}
                                    value={food.description}
                                    onChange={(e) => updateFooding(dayIndex, foodIndex, "description", e.target.value)}
                                    placeholder="Describe the meal"
                                  />
                                </div>

                                <div>
                                  <Label htmlFor={`food-${dayIndex}-${foodIndex}-photo`}>Photo URL</Label>
                                  <Input
                                    id={`food-${dayIndex}-${foodIndex}-photo`}
                                    value={food.photo}
                                    onChange={(e) => updateFooding(dayIndex, foodIndex, "photo", e.target.value)}
                                    placeholder="Enter photo URL"
                                  />
                                </div>
                              </div>
                            </div>
                          ))}

                          <Button variant="outline" onClick={() => addFooding(dayIndex)} className="w-full mt-2">
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Add Meal
                          </Button>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {Object.keys(errors).length > 0 && (
          <Alert variant="destructive" className="mt-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Please fix the errors above before proceeding.</AlertDescription>
          </Alert>
        )}

        <div className="mt-6 flex justify-between">
          <Button variant="outline" onClick={onBack}>
            Back: Basic Details
          </Button>
          <Button onClick={handleSubmit}>Next: Photos</Button>
        </div>
      </CardContent>
    </Card>
  )
}

