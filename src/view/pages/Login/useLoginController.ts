import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { authService } from "../../../app/services/authService";
import { SigninParams } from "../../../app/services/authService/singnin";
import { toast } from "react-hot-toast/headless";
import { useAuth } from "../../../app/hooks/useAuth";

const schema = z.object({
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

export function useLoginController() {
	const {
		register,
		handleSubmit: hookFormHandleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(schema),
	});

	const { mutateAsync, isLoading } = useMutation({
		mutationKey: ['signin'],
		mutationFn: async (data: SigninParams) => {
			return authService.singin(data);
		},
	});

	const { signin } = useAuth();

	const handleSubmit = hookFormHandleSubmit(async (data) => {
		try{
			const { acessToken } =  await mutateAsync(data); 
			signin(acessToken);
		} catch {
			toast.error("Credenciais inválidas")
		}
	});

	return { handleSubmit, register, errors, isLoading };
}
