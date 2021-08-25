import { join } from "path";
import moduleAlias from "module-alias";

const baseDir = "./src";

const modulePath = (path: string) => join(process.cwd(), `${baseDir}/${path}`);

const registerModuleAliases = () => {
  moduleAlias.addAliases({
    "@controllers": modulePath("controllers"),
    "@interfaces": modulePath("interfaces"),
    "@models": modulePath("models"),
    "@routes": modulePath("routes"),
    "@utils": modulePath("utils"),
    "@validators": modulePath("validators"),
    "@root": modulePath("index"),
    "@serializers": modulePath("serializers"),
  });
};

registerModuleAliases();
