"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { PlusCircle, Trash2, LayoutDashboard } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export function TabsManager({ tabs, onChange, onBack }) {
  const [currentTabs, setCurrentTabs] = useState(tabs || [])
  const [errors, setErrors] = useState({})

  const addTab = () => {
    setCurrentTabs([...currentTabs, { tab_name: "", tab_content: "" }])
  }

  const updateTab = (index, field, value) => {
    const updatedTabs = [...currentTabs]
    updatedTabs[index][field] = value
    setCurrentTabs(updatedTabs)

    // Clear error for this tab if it exists
    if (errors[`tab-${index}-${field}`]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[`tab-${index}-${field}`]
        return newErrors
      })
    }
  }

  const removeTab = (index) => {
    const updatedTabs = [...currentTabs]
    updatedTabs.splice(index, 1)
    setCurrentTabs(updatedTabs)
  }

  const validateTabs = () => {
    const newErrors = {}

    currentTabs.forEach((tab, index) => {
      if (!tab.tab_name) {
        newErrors[`tab-${index}-tab_name`] = "Tab name is required"
      }

      if (!tab.tab_content) {
        newErrors[`tab-${index}-tab_content`] = "Tab content is required"
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateTabs()) {
      onChange(currentTabs)
      // This is the final step, so we don't call onNext
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Custom Tabs</h3>
            <Button variant="outline" onClick={addTab}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Tab
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mb-4">
            Add custom tabs for additional information about the tour. Common tabs include FAQs, Terms & Conditions,
            etc.
          </p>

          {currentTabs.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-md">
              <LayoutDashboard className="h-12 w-12 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">No custom tabs added yet. Click "Add Tab" to get started.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {currentTabs.map((tab, index) => (
                <div key={`tab-${index}`} className="p-4 border rounded-md">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium">Tab {index + 1}</h4>
                    <Button variant="ghost" size="icon" onClick={() => removeTab(index)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor={`tab-${index}-name`}>
                        Tab Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id={`tab-${index}-name`}
                        value={tab.tab_name}
                        onChange={(e) => updateTab(index, "tab_name", e.target.value)}
                        placeholder="Enter tab name (e.g., FAQs, Terms & Conditions)"
                        className={errors[`tab-${index}-tab_name`] ? "border-red-500" : ""}
                      />
                      {errors[`tab-${index}-tab_name`] && (
                        <p className="text-red-500 text-sm">{errors[`tab-${index}-tab_name`]}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor={`tab-${index}-content`}>
                        Tab Content <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id={`tab-${index}-content`}
                        value={tab.tab_content}
                        onChange={(e) => updateTab(index, "tab_content", e.target.value)}
                        placeholder="Enter tab content"
                        className={`min-h-[150px] ${errors[`tab-${index}-tab_content`] ? "border-red-500" : ""}`}
                      />
                      {errors[`tab-${index}-tab_content`] && (
                        <p className="text-red-500 text-sm">{errors[`tab-${index}-tab_content`]}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {Object.keys(errors).length > 0 && (
          <Alert variant="destructive" className="mt-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Please fix the errors above before proceeding.</AlertDescription>
          </Alert>
        )}

        <div className="mt-6 flex justify-between">
          <Button variant="outline" onClick={onBack}>
            Back: Photos
          </Button>
          <Button onClick={handleSubmit}>Save Tour Package</Button>
        </div>
      </CardContent>
    </Card>
  )
}

