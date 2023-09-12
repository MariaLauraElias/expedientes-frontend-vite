import { useState } from "react";
//hook para trabajar las ventanas modales
const useModal = (initialValue = false) => {
  const [isOpen, setIsOpen] = useState(initialValue);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  return [isOpen, openModal, closeModal]
}
export default useModal;
