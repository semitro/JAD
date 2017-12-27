package vt.smt.world.user.security;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class Hasher {

    public static String getHash(String password){
        MessageDigest md = null;
        try {
            md = MessageDigest.getInstance("SHA-256");
        }catch (NoSuchAlgorithmException e){
            e.printStackTrace();
        }
        md.update(password.getBytes());

        byte byteData[] = md.digest();

        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < byteData.length; i++) {
            sb.append(Integer.toString((byteData[i] & 0xff) + 0x100, 16).substring(1));
        }
        return sb.toString();
    }
}
