import { Outlet } from "react-router-dom";
import NavBar from "./NavBar/NavBar";
import { useDialog } from "pages/common-components/Dialog/useDialog";
import Dialog from "pages/common-components/Dialog/Dialog";

export default function HomePage() {
  const [openDialog, dialogMessage, isError, isModalOpen, setIsModalOpen] =
    useDialog();

  return (
    <div>
      <NavBar openDialog={openDialog}/>
      <Outlet context={openDialog} />
      <Dialog
        dialogMessage={dialogMessage}
        isError={isError}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
}
