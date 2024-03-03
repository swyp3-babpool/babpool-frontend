import React, { useEffect } from 'react';

type UseOutsideClickModalCloseProps = {
    ref: React.RefObject<HTMLDivElement>;
    isOpen: boolean;
    closeModal: () => void;
};

export default function useOutsideClickModalClose({
    ref,
    isOpen,
    closeModal,
}: UseOutsideClickModalCloseProps) {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                // Clicked outside the HeaderMenu, close it
                closeModal();
            }
        };

        if (isOpen) {
            // Attach the event listener
            document.addEventListener('mousedown', handleClickOutside);
        }
        // Clean up the event listener on component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, isOpen, closeModal]);
}
