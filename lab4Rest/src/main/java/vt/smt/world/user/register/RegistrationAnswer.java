package vt.smt.world.user.register;

public class RegistrationAnswer {
    private boolean succees;
    private String authToken;
    private String error;

    public boolean isSuccees() {
        return succees;
    }

    public void setSuccees(boolean succeed) {
        this.succees = succeed;
    }

    public String getAuthToken() {
        return authToken;
    }

    public void setAuthToken(String authTocken) {
        this.authToken = authTocken;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }
}
