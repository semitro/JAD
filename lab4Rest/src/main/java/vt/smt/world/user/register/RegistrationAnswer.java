package vt.smt.world.user.register;

public class RegistrationAnswer {
    private boolean success;
    private String authToken;
    private String error;

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean succeed) {
        this.success = succeed;
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
