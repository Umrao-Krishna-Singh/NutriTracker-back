import { Controller, ControllerOptions } from '@nestjs/common'

export const apiPrefix = `/api`

export const ApiController: (
    optionOrString?: string | string[] | ControllerOptions,
    version?: number | null,
) => ReturnType<typeof Controller> = (...rest) => {
    const [controller, version, ...args] = rest

    const apiRoutePrefix =
        apiPrefix + (version === null ? '' : version ? `/v${version}` : '/v1')

    if (!controller) return Controller(apiRoutePrefix)

    const transformPath = (path: string) =>
        `${apiRoutePrefix}/${path.replace(/^\/*/, '')}`

    if (typeof controller === 'string') {
        return Controller(transformPath(controller), ...args)
    } else if (Array.isArray(controller)) {
        return Controller(
            controller.map((path) => transformPath(path)),
            ...args,
        )
    } else {
        const path = controller.path || ''

        return Controller(
            Array.isArray(path) ? path.map((i) => transformPath(i)) : transformPath(path),
            ...args,
        )
    }
}
