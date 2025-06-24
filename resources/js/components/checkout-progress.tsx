export function CheckoutProgress({ currentStep, steps }: CheckoutProgressProps) {
  // Update the default steps to include delivery method
  const defaultSteps = ["Delivery", "Shipping", "Payment", "Review", "Confirmation"]
  const progressSteps = steps || defaultSteps

  return (
    <div className="py-6">
      <div className="flex items-center justify-between">
        {progressSteps.map((step, index) => (
          <div key={step} className="flex items-center">
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  index < currentStep
                    ? "bg-green-600 text-white"
                    : index === currentStep
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-600"
                }`}
              >
                {index < currentStep ? <Check className="w-4 h-4" /> : <span>{index + 1}</span>}
              </div>
              <span className={`ml-2 text-sm font-medium ${index <= currentStep ? "text-gray-900" : "text-gray-500"}`}>
                {step}
              </span>
            </div>
            {index < progressSteps.length - 1 && (
              <div className={`w-12 h-0.5 mx-4 ${index < currentStep ? "bg-green-600" : "bg-gray-200"}`} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
