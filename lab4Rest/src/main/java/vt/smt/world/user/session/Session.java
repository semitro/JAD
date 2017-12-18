package vt.smt.world.user.session;

import com.sun.istack.internal.NotNull;

import javax.ejb.Stateful;
import java.util.HashMap;
import java.util.Map;

/*
 * Keeps the list of pairs of user's id and their tokens
 *
 */
@Stateful
public class Session {
    private static Map<Integer, String> user_id_token = new HashMap<>();

    public static String startSession(@NotNull Integer userId){
        if(user_id_token.containsKey(userId))
            return user_id_token.get(userId);

        String token;
        do {
            token = getRandomString(); // this token must be unique
            // next stroke implements this requirement
        }while (user_id_token.containsValue(token));
        user_id_token.put(userId, token);
       return token;
    }

    public static Integer getIdByToken(@NotNull String token){
        for (Map.Entry<Integer, String> i : user_id_token.entrySet())
            if(i.getValue().equals(token))
                return i.getKey();

        return null;
    }
    // user's token by id
    public static String getUsersToken(@NotNull Integer userId){
        return user_id_token.get(userId);
    }

    public static boolean endSession(@NotNull Integer userId){
       return user_id_token.remove(userId,user_id_token.get(userId));
    }

    public static boolean endSession(@NotNull String token){
        return endSession(getIdByToken(token));
    }

    private static String getRandomString(){
        StringBuilder builder = new StringBuilder();

        for(int i = 0; i < Math.random()*32 + 16; i++)
            builder.append((char)(Math.random()*223) + 21 );

        return builder.toString();
    }
}
