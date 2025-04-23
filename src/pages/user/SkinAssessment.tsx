import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AppContext } from "../../context/AppContext";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Textarea } from "../../components/ui/textarea";
import { Checkbox } from "../../components/ui/checkbox";
import skinProfileService from "../../api/services/skinService";
import { toast } from "sonner";
import { skinAssessmentSchema } from "../../lib/validator";
import { SkinAssessmentFormData, SkinConcern } from "../../lib/types";

export default function SkinAssessment() {
  const { setIsLoading, setSkinProfile } = useContext(AppContext);
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  // Initialize form
  const form = useForm<SkinAssessmentFormData>({
    resolver: zodResolver(skinAssessmentSchema),
    defaultValues: {
      skinType: undefined,
      concerns: [],
      allergies: "",
      goals: "",
    },
  });

  // Handle form submission
  const onSubmit = async (values: SkinAssessmentFormData) => {
    try {
      setIsLoading(true);
      const response = await skinProfileService.createSkinProfile(values);
      setSkinProfile(response);
      toast.success("Skin assessment completed successfully!");
      navigate("/user/dashboard");
    } catch (error) {
      console.error("Error saving skin profile:", error);
      toast.error(
        error.response?.data?.message || "Failed to save your skin profile"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Next step handler
  const handleNextStep = async () => {
    let isValid = false;

    if (step === 1) {
      isValid = await form.trigger("skinType");
    } else if (step === 2) {
      isValid = await form.trigger("concerns");
    }

    if (isValid) {
      setStep(step + 1);
    }
  };

  // Previous step handler
  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  // Skin type options
  const skinTypeOptions = [
    {
      value: "DRY",
      label: "Dry",
      description: "Skin feels tight, flaky, or rough",
    },
    {
      value: "OILY",
      label: "Oily",
      description: "Skin looks shiny and feels greasy",
    },
    {
      value: "COMBINATION",
      label: "Combination",
      description: "Oily T-zone with normal or dry cheeks",
    },
    {
      value: "NORMAL",
      label: "Normal",
      description: "Neither too oily nor too dry",
    },
    {
      value: "SENSITIVE",
      label: "Sensitive",
      description: "Easily irritated, red, or itchy",
    },
  ];

  // Skin concerns options
  const skinConcernsOptions = [
    { id: "ACNE", label: "Acne" },
    { id: "AGING", label: "Aging/Fine Lines" },
    { id: "PIGMENTATION", label: "Pigmentation" },
    { id: "SENSITIVITY", label: "Sensitivity" },
    { id: "DRYNESS", label: "Dryness" },
    { id: "OILINESS", label: "Oiliness" },
    { id: "REDNESS", label: "Redness" },
    { id: "UNEVEN_TEXTURE", label: "Uneven Texture" },
  ];

  return (
    <div className="container max-w-3xl px-4 py-10 mx-auto">
      <div className="flex flex-col items-center mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold">Skin Assessment</h1>
        <p className="text-foreground/70">
          Help us understand your skin to provide personalized recommendations
        </p>

        {/* Progress indicator */}
        <div className="flex items-center w-full max-w-md gap-2 mt-6">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div
              key={index}
              className={`h-2 flex-1 rounded-full transition-colors ${
                index + 1 <= step ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>
        <p className="mt-2 text-sm text-foreground/70">
          Step {step} of {totalSteps}
        </p>
      </div>

      <Card className="border-muted">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* Step 1: Skin Type */}
            {step === 1 && (
              <>
                <CardHeader>
                  <CardTitle>What's your skin type?</CardTitle>
                  <CardDescription>
                    Choose the option that best describes your skin most of the
                    time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="skinType"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value?.[0]?.type || ""}
                            className="space-y-3"
                          >
                            {skinTypeOptions.map((option) => (
                              <div key={option.value} className="flex">
                                <FormItem className="flex items-center w-full space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value={option.value} />
                                  </FormControl>
                                  <div className="flex-1 p-3 rounded-md hover:bg-muted">
                                    <FormLabel className="font-normal cursor-pointer">
                                      <div className="font-medium">
                                        {option.label}
                                      </div>
                                      <div className="text-sm text-foreground/70">
                                        {option.description}
                                      </div>
                                    </FormLabel>
                                  </div>
                                </FormItem>
                              </div>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </>
            )}

            {/* Step 2: Skin Concerns */}
            {step === 2 && (
              <>
                <CardHeader>
                  <CardTitle>What are your skin concerns?</CardTitle>
                  <CardDescription>
                    Select all that apply to you
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="concerns"
                    render={({ field }) => (
                      <FormItem>
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                          {skinConcernsOptions.map((item) => (
                            <FormItem
                              key={item.id}
                              className="flex items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.some(
                                    (value) => value.concern === item.id
                                  )}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          { concern: item.id as SkinConcern },
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value.concern !== item.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                {item.label}
                              </FormLabel>
                            </FormItem>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </>
            )}

            {/* Step 3: Allergies & Goals */}
            {step === 3 && (
              <>
                <CardHeader>
                  <CardTitle>Tell us more about you</CardTitle>
                  <CardDescription>
                    Share any allergies and your skincare goals
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="allergies"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Do you have any allergies?</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="E.g., fragrance, nuts, latex"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          List ingredients that cause reactions (optional)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="goals"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>What are your skincare goals?</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="E.g., reduce acne, improve hydration, minimize fine lines"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Tell us what you want to achieve with your skincare
                          routine
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </>
            )}

            <CardFooter className="flex justify-between">
              {step > 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePreviousStep}
                >
                  Previous
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/user/dashboard")}
                >
                  Cancel
                </Button>
              )}

              {step < totalSteps ? (
                <Button type="button" onClick={handleNextStep}>
                  Next
                </Button>
              ) : (
                <Button type="submit">Complete Assessment</Button>
              )}
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
