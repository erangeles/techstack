export function validateJSON(control: any) {
    const value = control.value?.toString()?.trim();

    try {
        if (value && value.length > 0) {
            JSON.parse(control.value);
        }
        return null;
    } catch {
        return { error: 'invalid JSON' };
    }
}
