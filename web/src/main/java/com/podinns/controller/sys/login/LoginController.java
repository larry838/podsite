package com.podinns.controller.sys.login;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.List;

import javax.imageio.ImageIO;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
/*import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.ExcessiveAttemptsException;
import org.apache.shiro.authc.ExpiredCredentialsException;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.LockedAccountException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;*/
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.alibaba.fastjson.JSON;
import com.google.code.kaptcha.Constants;
import com.google.code.kaptcha.Producer;
//import com.google.code.kaptcha.Constants;
import com.podinns.base.basecontroller.BaseController;
import com.podinns.exception.SystemException;
//import com.podinns.model.logininfo.LoginInfoEntity;
import com.podinns.model.resource.ResourceEntity;
//import com.podinns.shiro.ShiroAuthenticationManager;
import com.podinns.model.user.UserEntity;
import com.podinns.util.TreeUtil;
import com.podinns.service.resource.ResourceService;

/**
 * 
 * @ClassName: IndexController
 * @Description: 登录、注册、退出、验证码
 * @author carry xie
 * @date 2016年10月25日 下午3:20:47
 *
 */

@Controller
@RequestMapping(value = "/")
public class LoginController  extends BaseController {
	
	@Autowired
	private ResourceService resourceService;
	
	@Autowired
	private Producer captchaProducer;
	
	
	@RequestMapping(value = "login.html", method = RequestMethod.GET, produces = "text/html; charset=utf-8")
	public String login(HttpServletRequest request) {
		try{
			request.removeAttribute("error");
			return "login";
		}catch(Exception e)
		{
			throw new SystemException(e);
		}
	}
	/**
	 * 用户退出
	 * 
	 * @return
	 */
	@RequestMapping(value = "logout.html", method = RequestMethod.GET)
	public String logout() {
		// 注销登录
		//ShiroAuthenticationManager.logout();
		return "redirect:login.html";
	}
	
	/**
	 * 
	 * @return
	 */
	@RequestMapping(value = "index.html", method = RequestMethod.GET)
	public String index(Model model) {
		try
		{
			// 获取登录的bean
			//UserEntity userEntity = (UserEntity)SecurityUtils.getSubject().getPrincipal();
			UserEntity userEntity=new UserEntity();
			userEntity.setId(1L);
			List<ResourceEntity> list = resourceService.findResourcesMenuByUserId(userEntity.getId().intValue());
			List<ResourceEntity> treeList = new TreeUtil().getChildResourceEntitys(list, null);
			model.addAttribute("list", treeList);
			model.addAttribute("menu", JSON.toJSONString(treeList));
			// 登陆的信息回传页面
			model.addAttribute("userEntity", userEntity);
			return "index";
		}catch(Exception e)
		{
			throw new SystemException(e);
		}
	}
	
	
	/**
	 * 用户登录
	 * 认证过程：
	 * 1、想要得到Subject对象,访问地址必须在shiro的拦截地址内,不然会报空指针
	 * 2、用户输入的账号和密码,存到UsernamePasswordToken对象中,然后由shiro内部认证对比
	 * 3、认证执行者交由ShiroDbRealm中doGetAuthenticationInfo处理
	 * 4、当以上认证成功后会向下执行,认证失败会抛出异常
	 * 
	 * @param accountName	账户名称
	 * @param password	密码
	 * @return
	 */
	@RequestMapping(value = "login.html", method = RequestMethod.POST, produces = "text/html; charset=utf-8")
	public String userLogin(UserEntity userEntity, String captcha, Boolean rememberMe, HttpServletRequest request) {

		return "redirect:index.html";
	}
	
	@RequestMapping(value = "captcha.html", method = RequestMethod.GET)
    public void kaptcha(HttpServletRequest req, HttpServletResponse rsp) {
		ServletOutputStream out = null;
		try {
	        rsp.setDateHeader("Expires", 0);
	        rsp.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
	        rsp.addHeader("Cache-Control", "post-check=0, pre-check=0");
	        rsp.setHeader("Pragma", "no-cache");
	        rsp.setContentType("image/jpeg");
	
	        String capText = captchaProducer.createText();
	        //将验证码存入shiro 登录用户的session
	       // ShiroAuthenticationManager.setSessionAttribute(Constants.KAPTCHA_SESSION_KEY, capText);
	
	        BufferedImage image = captchaProducer.createImage(capText);
	        out = rsp.getOutputStream();
	        ImageIO.write(image, "jpg", out);
	        out.flush();
        }catch(IOException e)
		{
			throw new SystemException(e);
		} finally {
            try {
				out.close();
			} catch (IOException e) {
				throw new SystemException(e);
			}
        }
    }
}
