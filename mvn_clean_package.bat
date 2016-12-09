@echo off

:INPUT
echo  c.ִ��clean����
echo  p.ִ��package����
echo  s.ִ������source�ļ�����
echo  e.ִ��eclipse����
echo  q.�˳�

echo ������Ҫѡ������
set /p cmd=
IF %cmd% == c GOTO CLEAN
IF %cmd% == p GOTO PACKAGE
IF %cmd% == s GOTO SOURCES
IF %cmd% == e GOTO ECLIPSE
IF %cmd% == a GOTO ASSEMBLY
IF %cmd% == q GOTO END

:ECLIPSE
call mvn eclipse:clean
call mvn eclipse:eclipse
echo ============================================================================
echo =========================== eclipse is complete===============================
echo ============================================================================
GOTO INPUT

:CLEAN
call mvn eclipse:clean
call mvn clean
echo ============================================================================
echo =========================== clean is complete===============================
echo ============================================================================
GOTO INPUT

:PACKAGE
call mvn clean
call mvn -Dmaven.test.skip=true install
cd %~dp0\web\target
if exist %~dp0\web\target\podsite.war del %~dp0\web\target\podsite.war /q
rem ren podsite  podsite.war 
cd %~dp0
echo ============================================================================
echo =========================== package is complete=============================
echo ============================================================================
GOTO INPUT


:SOURCES
mvn dependency:sources
echo ============================================================================
echo =========================== sources is complete=============================
echo ============================================================================
GOTO INPUT

:END
@pause

