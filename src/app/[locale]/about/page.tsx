import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("About Us");
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 py-24 dark:bg-black sm:pb-16">
      <div className="bg-[url(/munich_bg.svg)] bg-cover p-10 xl:bg-center">
        <h1 className="px-4 py-10 font-serif text-5xl">Motivation</h1>
      </div>
      <div className="grid grid-cols-1 gap-6 p-6 sm:gap-10 sm:p-10 lg:grid-cols-2">
        <div className="grid place-content-center justify-between space-y-4 text-pretty text-lg sm:text-lg md:text-xl">
          <p>{t("main 1")}</p>
          <p>{t("main 2")}</p>
          <p>{t("main 3")}</p>
          <p>{t("main 4")}</p>
          <p>{t("main 5")}</p>
        </div>
        <div className="grid place-content-center">
          <img src="/Wiqi_Mascot_Minimalistic.png" alt="Some image" />
        </div>
      </div>
      <div className="bg-[url(/munich_bg.svg)] bg-cover p-10 xl:bg-center">
        <h1 className="px-4 py-10 font-serif text-3xl xl:text-5xl">
          {t("who are we")}
        </h1>
      </div>

      <div className="grid grid-cols-2 items-center gap-4 p-10">
        <div className="flex flex-col items-center text-center">
          <img src="/wq.png" className="h-24 w-24 rounded-full" alt="Profile" />
          <p className="font-semibold">tgtgggedd jkdndecjdn</p>
          <p className="text-sm text-gray-600">
            MSc Student in jdcnbdjfnd at TUM
          </p>
        </div>
        <div className="text-gray-700">
          <p>
            djdn djcidjwdc djcidwjefc cjndcd eufhe eufhed owihd ijf hywdh
            ufnfueh quwhdwhdi iufhuth oquweue d iwa3erh haf freu iwuefhufuho
            ethdf etufh ehe. iwdfh urhfuueruq iuerhueud iuhwheud. afij lorjfue
            Sfdierfjrj theirfriefr thvuewo pewdj ed irje, ijdierj oawjeue
            fjserjf wapeh kfenejw eir ioerjhwei weijw qie owier haoie eihtjwqro
            eirjwerj weirjwer.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 items-center gap-4 p-10">
        <div className="text-gray-700">
          <p>
            djdn djcidjwdc djcidwjefc cjndcd eufhe eufhed owihd ijf hywdh
            ufnfueh quwhdwhdi iufhuth oquweue d iwa3erh haf freu iwuefhufuho
            ethdf etufh ehe. iwdfh urhfuueruq iuerhueud iuhwheud. afij lorjfue
            Sfdierfjrj theirfriefr thvuewo pewdj ed irje, ijdierj oawjeue
            fjserjf wapeh kfenejw eir ioerjhwei weijw qie owier haoie eihtjwqro
            eirjwerj weirjwer.
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <img src="/wq.png" className="h-24 w-24 rounded-full" alt="Profile" />
          <p className="font-semibold">tgtgggedd jkdndecjdn</p>
          <p className="text-sm text-gray-600">
            MSc Student in jdcnbdjfnd at TUM
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 items-center gap-4 p-10">
        <div className="flex flex-col items-center text-center">
          <img src="/wq.png" className="h-24 w-24 rounded-full" alt="Profile" />
          <p className="font-semibold">tgtgggedd jkdndecjdn</p>
          <p className="text-sm text-gray-600">
            MSc Student in jdcnbdjfnd at TUM
          </p>
        </div>
        <div className="text-gray-700">
          <p>
            djdn djcidjwdc djcidwjefc cjndcd eufhe eufhed owihd ijf hywdh
            ufnfueh quwhdwhdi iufhuth oquweue d iwa3erh haf freu iwuefhufuho
            ethdf etufh ehe. iwdfh urhfuueruq iuerhueud iuhwheud. afij lorjfue
            Sfdierfjrj theirfriefr thvuewo pewdj ed irje, ijdierj oawjeue
            fjserjf wapeh kfenejw eir ioerjhwei weijw qie owier haoie eihtjwqro
            eirjwerj weirjwer.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 items-center gap-4 p-10">
        <div className="text-gray-700">
          <p>
            djdn djcidjwdc djcidwjefc cjndcd eufhe eufhed owihd ijf hywdh
            ufnfueh quwhdwhdi iufhuth oquweue d iwa3erh haf freu iwuefhufuho
            ethdf etufh ehe. iwdfh urhfuueruq iuerhueud iuhwheud. afij lorjfue
            Sfdierfjrj theirfriefr thvuewo pewdj ed irje, ijdierj oawjeue
            fjserjf wapeh kfenejw eir ioerjhwei weijw qie owier haoie eihtjwqro
            eirjwerj weirjwer.
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <img src="/wq.png" className="h-24 w-24 rounded-full" alt="Profile" />
          <p className="font-semibold">tgtgggedd jkdndecjdn</p>
          <p className="text-sm text-gray-600">
            MSc Student in jdcnbdjfnd at TUM
          </p>
        </div>
      </div>
    </div>
  );
}
