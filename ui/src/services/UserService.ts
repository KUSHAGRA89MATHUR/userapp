
export class UserService {

    public async getAllUsers(): Promise<any> {
        const response = await fetch('/api/users');
        return await response.json();
    }

    public async createUser(data: any): Promise<any> {
        
        const response = await fetch(`/api/user`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({user: data})
        })
        return await response.json();
    }

    public async deleteUser(userId: number): Promise<any> {
        const response = await fetch(`/api/user/${userId}`, {method: 'DELETE'})
        return await response.json();
    }

    public async editUser(data: any): Promise<any> {
        const response = await fetch(`/api/user`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({user: data})
        })
        return await response.json();
    }
}