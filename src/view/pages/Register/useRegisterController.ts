import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authService } from "../../../app/services/authService";
import { useMutation } from "@tanstack/react-query";
import { SignupParams } from "../../../app/services/authService/singnup";
import { toast } from "react-hot-toast"
import { useAuth } from "../../../app/hooks/useAuth";

const schema = z.object({
	name: z.string().nonempty("Nome é obrigatório"),
	email: z
		.string()
		.nonempty("E-mail é obrigatório")
		.email("Informe um e-mail válido"),
	password: z
		.string()
		.nonempty("Senha é obrigatória")
		.min(8, "Senha deve conter pelo 8 dígitos"),
});

type FormData = z.infer<typeof schema>;

export function useRegisterController() {
	const {
		register,
		handleSubmit: hookFormHandleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(schema),
	});

	const { mutateAsync, isLoading } = useMutation({
		mutationKey: ['signup'],
		mutationFn: async (data: SignupParams) => {
			return authService.singup(data);
		},
	});

	const { signin } = useAuth();

	const handleSubmit = hookFormHandleSubmit(async (data) => {
		try{
			const { acessToken } = await mutateAsync(data);
			signin(acessToken);
		} catch {
			toast.error("Ocorreu um erro ao criar sua conta")
		}
	});

	return { handleSubmit, register, errors, isLoading };
}
