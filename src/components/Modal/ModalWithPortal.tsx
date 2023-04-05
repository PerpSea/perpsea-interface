import Portal from '@/common/Portal';
import Modal from './Modal';

export default function ModalWithPortal(props: any) {
  return (
    <Portal>
      <Modal {...props} />
    </Portal>
  );
}
