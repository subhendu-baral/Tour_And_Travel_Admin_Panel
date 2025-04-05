"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BasicDetails } from "./components/basic-details"
import { ItineraryManager } from "./components/itinerary-manager"
import { PhotoUpload } from "./components/photo-upload"
import { TabsManager } from "./components/tabs-manager"
import { useToast } from "@/hooks/use-toast"


export default function AddTourPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("basic-details")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Main tour data state
  const [tourData, setTourData] = useState({
    // Basic details
    package_title: "",
    city: "",
    locations: "",
    min_price: "",
    max_price: "",
    num_nights: "",
    total_days: "",
    journey_start_place: "",
    journey_end_place: "",
    overview: "",
    inclusions_exclusions: "",
    additional_info: "",

    // Itineraries with nested activities, sightseeing, and fooding
    itineraries: [],

    // Photos
    photos: [],

    // Custom tabs
    tabs: [],
  })

  const handleBasicDetailsChange = (basicDetails) => {
    setTourData((prev) => ({
      ...prev,
      ...basicDetails,
    }))
  }

  const handleItinerariesChange = (itineraries) => {
    setTourData((prev) => ({
      ...prev,
      itineraries,
    }))
  }

  const handlePhotosChange = (photos) => {
    setTourData((prev) => ({
      ...prev,
      photos,
    }))
  }

  const handleTabsChange = (tabs) => {
    setTourData((prev) => ({
      ...prev,
      tabs,
    }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      // Here you would implement the actual API calls to save the data
      // This is a placeholder for the actual implementation
      console.log("Submitting tour data:", tourData)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Success!",
        description: "Tour package has been created successfully.",
        variant: "success",
      })

      // Redirect to tours list
      router.push("/admin/tours")
    } catch (error) {
      console.error("Error submitting tour:", error)
      toast({
        title: "Error",
        description: "Failed to create tour package. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const navigateToTab = (tab) => {
    setActiveTab(tab)
  }

  return (
    <div className="container mx-auto py-5">
      <Card className="border-none shadow-none">
        <CardHeader className='pt-0'>
          <CardTitle className="text-3xl font-bold">Add New Tour Package</CardTitle>
          <CardDescription>Create a new tour package by filling out the details in each section.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 sticky top-[64px]">
              <TabsTrigger value="basic-details">Basic Details</TabsTrigger>
              <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
              <TabsTrigger value="photos">Photos</TabsTrigger>
              <TabsTrigger value="tabs">Custom Tabs</TabsTrigger>
            </TabsList>

            <TabsContent value="basic-details">
              <BasicDetails
                data={tourData}
                onChange={handleBasicDetailsChange}
                onNext={() => navigateToTab("itinerary")}
              />
            </TabsContent>

            <TabsContent value="itinerary">
              <ItineraryManager
                itineraries={tourData.itineraries}
                totalDays={tourData.total_days}
                onChange={handleItinerariesChange}
                onNext={() => navigateToTab("photos")}
                onBack={() => navigateToTab("basic-details")}
              />
            </TabsContent>

            <TabsContent value="photos">
              <PhotoUpload
                photos={tourData.photos}
                onChange={handlePhotosChange}
                onNext={() => navigateToTab("tabs")}
                onBack={() => navigateToTab("itinerary")}
              />
            </TabsContent>

            <TabsContent value="tabs">
              <TabsManager tabs={tourData.tabs} onChange={handleTabsChange} onBack={() => navigateToTab("photos")} />
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.push("/admin/tours")}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Tour Package"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

