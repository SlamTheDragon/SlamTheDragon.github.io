/**
 * This component requires Redux to work.
 * Here is the overview on how this component works:
 * 
 * ### UPON LOAD ###
 * - if (!props.isOpen) return null;
 * Modal wont be displayed unless isOpen turns to be true.
 * - function onInteract()...
 * Modal will finish loading its final state whenever the user starts interacting to it. 
 * This, to prevent locking all elements from being accessible. See modalSlice.ts
*/

import React from 'react';
import { ReactComponent as Open } from '@material-design-icons/svg/outlined/open_in_new.svg';
import Button from '../Button/Button';
import style from './modal.module.scss'
import { Logging } from '../../../utils/logger';

interface ModalProps {
    modalTitle: string
    isOpen: boolean
    children?: React.ReactNode
    selectInterface: number
    selectAction?: number
    onClose: () => void
}

/**
 * Reusable, Single-Plug Modal for React.
 * @param {modalTitle} props.modalTitle - string title
 * @param {isOpen} props.isOpen - boolean, state switcher whether to show the modal or not
 * @param {onClose} props.onClose - void function, requires a function to update `props.isOpen`
 * @param {selectInterface} props.selectInterface - number, select a component in the list by key
 * @param {selectAction} props.selectAction - WIP
 * 
 * @returns Modal, Actions
*/
export default function Modal(props: ModalProps) {
    if (!props.isOpen) return null;

    const childArray = React.Children.toArray(props.children);
    const selectedChild = childArray[props.selectInterface];   
    // console.log(Object.values(selectedChild)[2]);

    function onInteract() {
        document.body.classList.remove('disable-events');
    };

    return (
        <div className={style.modal} onMouseEnter={onInteract}>
            
            <div className={style.modalWrapper}>
                <div className={style.modalHeader}>
                    <h3>{props.modalTitle}</h3>
                    <Button onClick={props.onClose}>✖</Button>
                </div>
                <div className={style.modalContainer}>
                    {selectedChild}
                </div>
                <div className={style.modalAction}>
                    {/* TODO: make this globally customizable */}
                    {(Object.values(selectedChild)[2] !== '.$1') ? <Button classItem='primary' onClick={props.onClose}>Okay</Button> : <Button classItem='primary' onClick={() => (window.location.href = "https://slamthedragon.me/commissions-old")}>Old Site &nbsp; <Open/></Button>}
                </div>
            </div>

            <div className={style.modalBackground} onClick={props.onClose} />
        </div>
    );
};