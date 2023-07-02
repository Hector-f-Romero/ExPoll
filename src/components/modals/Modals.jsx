import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { QRCodeSVG } from "qrcode.react";

const MySwal = withReactContent(Swal);

const MODAL_TYPES = {
	SUCCESS: "success",
	WARNING: "warning",
	ERROR: "error",
};

const showModal = async ({ title, text, type, confirmText }) => {
	await MySwal.fire({
		title: title,
		text: text,
		icon: type,
		confirmButtonText: confirmText,
	});
};

const showQRModal = async (url) => {
	await MySwal.fire({
		html: (
			<div className="flex items-center justify-center">
				<QRCodeSVG value={url} size={300} />
			</div>
		),
		showConfirmButton: false,
	});
};

export { MODAL_TYPES, showModal, showQRModal };
