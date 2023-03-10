export class HashManagerMock {
    public hash = async (plaintext: string): Promise<string> => {
        if (plaintext == "brisa") {
            return "hash-brisa"
        }

        return "hash-mock"
    }

    public compare = async (plaintext: string, hash: string): Promise<boolean> => {
        if (plaintext == "brisa" && hash == "hash-brisa") {
            return true
        }

        return false
    }
}