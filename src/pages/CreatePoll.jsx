import { useForm, useFieldArray } from "react-hook-form";

import Input from "../components/Input";
import { MODAL_TYPES, showErrorModal, showModal } from "../components/modals/Modals";
import { useDurationPoll } from "../components/hooks/useDurationPoll";
import { createPollService } from "../services/poll.service";

const CreatePoll = () => {
	const { durationPoll, formattedTime, handleChange } = useDurationPoll();
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		defaultValues: {
			options: [
				{
					value: undefined,
				},
			],
		},
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: "options",
	});

	const handleDeleteOption = async (index) => {
		// Verify that at least two options available.
		if (fields.length === 2) {
			await showErrorModal("At least two options", "A poll require at least two options", "Ok");
			return;
		}

		remove(index);
	};

	const handleAddOption = async () => {
		if (fields.length >= 6) {
			await showModal({
				title: "Respect the option limits",
				text: "Your polls only have to maximum of six options",
				type: MODAL_TYPES.WARNING,
				confirmText: "Ok",
			});
			return;
		}
		append({ value: "" });
	};

	const onSubmit = async (data) => {
		// Verify that at least two options available.
		if (fields.length < 2) {
			await showErrorModal("At least two options", "A poll require at least two options", "Ok");
			return;
		}

		data.duration = durationPoll;
		data.createdBy = import.meta.env.VITE_UNREGISTERED_USER_ID;
		data.verified = false;

		console.log(data);
		// const res = await createPollService(data);
		// console.log(res);
	};

	return (
		<article className="bg-[#111A21] text-white h-screen flex justify-center items-center overflow-auto">
			<div className="bg-main-card rounded-lg w-5/6 sm:w-3/4 h-fit py-10 px-4 md:px-10 overflow-y-auto max-h-[95vh] scrollbar-thin scrollbar-thumb-slate-600 scrollbar-thumb-rounded">
				<h1 className="text-2xl sm:text-4xl lg:text-5xl mb-5 font-semibold text-center text-white">
					Create poll
				</h1>
				<form action="" onSubmit={handleSubmit(onSubmit)}>
					<Input
						label="Title"
						placeholder="Poll title"
						name="title"
						required={{ value: true, message: "Poll title is required." }}
						minLength={{ value: 3, message: "Poll title must be between 3 and 10 character." }}
						maxLength={{ value: 30, message: "Poll title must be between 3 and 30 character." }}
						register={register}
						errors={errors.title}
					/>
					<Input
						label="Description"
						placeholder="Poll description"
						name="description"
						required={{ value: true, message: "Poll description is required." }}
						minLength={{ value: 3, message: "Poll description must be between 3 and 10 character." }}
						maxLength={{ value: 500, message: "Poll description must be between 3 and 500 character." }}
						register={register}
						errors={errors.description}
					/>
					<label htmlFor="duration" className="font-medium text-sm md:text-xl">
						Duration ({formattedTime})
					</label>
					<input
						type="range"
						defaultValue={durationPoll}
						name="duration"
						min={10}
						max={300}
						step={10}
						onChange={handleChange}
						className="w-full my-2 bg-gray-700 outline-none border border-neutral-600 focus:border-neutral-300 shadow-sm rounded-lg cursor-pointer appearance-none"
					/>
					<div className="flex flex-row items-center gap-5 mt-2">
						<p className="font-medium text-sm md:text-xl">Available options</p>
						<button
							onClick={() => handleAddOption()}
							className=" inline-flex p-2 rounded items-center justify-center focus:shadow-outline  text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium text-sm px-5 py-2.5 text-center mr-2 mb-2">
							<svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
								<path
									d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
									clipRule="evenodd"
									fillRule="evenodd"></path>
							</svg>
							Add option
						</button>
					</div>
					{fields.map((field, index) => (
						<div key={field.id} className="flex flex-row items-center justify-between gap-2">
							<div className="grow">
								<Input
									label={`Option ${index + 1}`}
									placeholder={`Option ${index + 1}`}
									name={`options.${index}.value`}
									required={{ value: true, message: "Option cannot be empty." }}
									minLength={{ value: 3, message: "Option must be between 3 and 10 character." }}
									maxLength={{ value: 30, message: "Option must be between 3 and 30 character." }}
									register={register}
									errors={errors.options?.[index]?.value}
								/>
							</div>
							<button
								onClick={() => handleDeleteOption(index)}
								className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 h-fit">
								Delete
							</button>
							<br />
						</div>
					))}
					<button
						type="submit"
						className="w-full px-4 py-2 my-2 text-white font-medium bg-primary-button hover:bg-hover-primary-button active:bg-hover-primary-button rounded-lg duration-150">
						Create poll
					</button>
				</form>
			</div>
		</article>
	);
};

export default CreatePoll;
