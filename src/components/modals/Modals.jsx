import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const showSuccessModal = async (title, text, confirmText) => {
	await MySwal.fire({
		title: title,
		text: text,
		icon: "success",
		confirmButtonText: confirmText,
	});
};

const showErrorModal = async (title, text, confirmText) => {
	await MySwal.fire({
		title: title,
		text: text,
		icon: "error",
		confirmButtonText: confirmText,
	});
};

const showModal = async ({ title, text, type, confirmText }) => {
	await MySwal.fire({
		title: title,
		text: text,
		icon: type,
		confirmButtonText: confirmText,
	});
};

const MODAL_TYPES = {
	SUCCESS: "success",
	WARNING: "warning",
	ERROR: "error",
};

export { MODAL_TYPES, showSuccessModal, showModal, showErrorModal };
