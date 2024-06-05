import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import type { FormSignUpData } from "../schema";
import { useSignUpStep } from "@/hooks/useAuth";
import { PhoneInput } from "@/components/ui/phone-input";
import { PasswordInput } from "@/components/ui/password-input";

export function PersonalData() {
  const { onChangeCurrentStep } = useSignUpStep();

  const form = useFormContext<FormSignUpData>();

  async function handleNextStep() {
    const hasValid = await Promise.all([
      form.trigger("fullname"),
      form.trigger("email"),
      form.trigger("password"),
      form.trigger("phone"),
    ]);

    onChangeCurrentStep("agency");
    if (hasValid.every((field) => field)) {
    }
  }

  return (
    <>
      <FormField
        control={form.control}
        name="fullname"
        render={({ field, formState }) => (
          <FormItem>
            <FormLabel>Nome completo</FormLabel>
            <FormControl>
              <Input
                autoComplete="new-password"
                error={!!formState.errors.fullname?.message}
                placeholder="seu nome completo"
                {...field}
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="phone"
        render={({ field, formState }) => (
          <FormItem className="flex flex-col items-start">
            <FormLabel className="text-left">Telefone</FormLabel>
            <FormControl>
              <PhoneInput
                maxLength={15}
                error={!!formState.errors.phone?.message}
                defaultCountry="BR"
                placeholder="Entre com um número"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        render={({ field, formState }) => (
          <FormItem>
            <FormLabel>E-mail</FormLabel>
            <FormControl>
              <Input
                autoComplete="new-password"
                error={!!formState.errors.email?.message}
                placeholder="você@exemplo.com"
                {...field}
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="password"
        render={({ field, formState }) => (
          <FormItem>
            <FormLabel>Senha</FormLabel>
            <FormControl>
              <PasswordInput
                autoComplete="new-password"
                error={!!formState.errors.password?.message}
                placeholder="••••••••"
                {...field}
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />

      <Button onClick={handleNextStep} type="button" className="mt-4">
        Continuar
      </Button>
    </>
  );
}
