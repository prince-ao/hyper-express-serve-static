import { Request } from 'hyper-express/types/components/http/Request'
import { Response } from 'hyper-express/types/components/http/Response'
import { MiddlewareNext } from 'hyper-express/types/components/middleware/MiddlewareNext'
import { statSync, readdirSync } from 'node:fs'

function getPathList(root: string): string[] {
    const pathList: string[] = [];

    function lambda(root: string) {
        const stats = statSync(root)

        if(stats.isFile()) {
            pathList.push(root)
        }else if(stats.isDirectory()) {
            for(const newRoot of readdirSync(root)) {
                if(newRoot === '.' || newRoot === '..') continue;
                lambda(root + "/" + newRoot);
            }
        }
    }

    lambda(root);

    return pathList;
}

export default (root: string) => {
    const pathList: string[] = getPathList(root)

    console.log(pathList)

    // return (request: Request, response: Response, next: MiddlewareNext) => {

    // }
}