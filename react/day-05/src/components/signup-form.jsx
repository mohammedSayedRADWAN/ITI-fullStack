import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/context/LanguageContext"

export function SignupForm({
  ...props
}) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col gap-6 w-full max-w-lg mx-auto" {...props}>
      <Card className="border-slate-100 dark:border-slate-800 shadow-2xl shadow-purple-500/10 bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border-4">
        <div className="h-4 bg-primary w-full" />
        <CardHeader className="space-y-4 pt-12 px-10">
          <CardTitle className="text-4xl font-black tracking-tighter text-center text-primary">{t('signupTitle')}</CardTitle>
          <CardDescription className="text-center text-slate-500 font-bold uppercase tracking-widest opacity-60">
            {t('signupDesc')}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-10 pt-4">
          <form className="space-y-8">
            <FieldGroup className="space-y-6">
              <Field>
                <FieldLabel htmlFor="name" className="text-xs font-black uppercase tracking-widest ml-1 text-primary/60">{t('fullName')}</FieldLabel>
                <Input id="name" type="text" placeholder="John Doe" required className="h-14 rounded-2xl bg-slate-50 dark:bg-black border-2 border-slate-100 dark:border-slate-800 focus-visible:ring-2 focus-visible:ring-primary transition-all font-bold" />
              </Field>
              <Field>
                <FieldLabel htmlFor="email" className="text-xs font-black uppercase tracking-widest ml-1 text-primary/60">{t('email')}</FieldLabel>
                <Input id="email" type="email" placeholder="m@example.com" required className="h-14 rounded-2xl bg-slate-50 dark:bg-black border-2 border-slate-100 dark:border-slate-800 focus-visible:ring-2 focus-visible:ring-primary transition-all font-bold" />
              </Field>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Field>
                  <FieldLabel htmlFor="password" className="text-xs font-black uppercase tracking-widest ml-1 text-primary/60">{t('password')}</FieldLabel>
                  <Input id="password" type="password" required className="h-14 rounded-2xl bg-slate-50 dark:bg-black border-2 border-slate-100 dark:border-slate-800 focus-visible:ring-2 focus-visible:ring-primary transition-all font-bold" />
                </Field>
                <Field>
                  <FieldLabel htmlFor="confirm-password" className="text-xs font-black uppercase tracking-widest ml-1 text-primary/60">
                    {t('confirmPassword')}
                  </FieldLabel>
                  <Input id="confirm-password" type="password" required className="h-14 rounded-2xl bg-slate-50 dark:bg-black border-2 border-slate-100 dark:border-slate-800 focus-visible:ring-2 focus-visible:ring-primary transition-all font-bold" />
                </Field>
              </div>
              <div className="pt-4 space-y-4">
                <Button type="submit" className="w-full h-14 rounded-[1.25rem] bg-accent hover:bg-accent/90 font-black uppercase tracking-widest text-white shadow-xl shadow-green-500/20 transition-all active:scale-[0.98] border-none text-lg">
                    {t('createAccount')}
                </Button>
                <Button variant="outline" type="button" className="w-full h-14 rounded-[1.25rem] font-black uppercase tracking-widest border-2 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
                  <img src="https://www.google.com/favicon.ico" alt="Google" className="h-5 w-5 mr-3" />
                  {t('signupWithGoogle')}
                </Button>
              </div>
            </FieldGroup>
          </form>
          <div className="mt-12 text-center border-t border-slate-100 dark:border-slate-800 pt-8">
            <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">
                {t('alreadyHaveAccount')}{' '}
                <a href="#" className="text-primary hover:underline underline-offset-4">
                    {t('signIn')}
                </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
