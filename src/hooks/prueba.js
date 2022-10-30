import { useDispatch, useSelector } from "react-redux"

export const abrirModal = () => {
    const dispatch = useDispatch()
    const {isDateModalOpen, onOpenDateModal} = useSelector(state => state.ui)

    console.log('>> ', isDateModalOpen)


    console.log('hola')    
    return;
}
