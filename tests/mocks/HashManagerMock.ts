export class HashManagerMock {
    public hash = async (plaintext: string): Promise<string> => {
        if (plaintext == "Bris@1234") {
            return "hash-brisa"
        }

        return "hash-mock"
    }

    public compare = async (plaintext: string, hash: string): Promise<boolean> => {
        if (plaintext == "Bris@1234" && hash == "hash-brisa") {
            return true
        }

        return false
    }
}