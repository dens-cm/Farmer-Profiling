import { useToast } from "@chakra-ui/react"

const Toast = () => {
  const toast = useToast()

  const showToast = ({ title, description, status, variant, position }) => {
    toast({
      title,
      description,
      status,
      duration: 4000,
      position,
      variant,
    })
  }

  return showToast
}

export default Toast